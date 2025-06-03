import { FloatingMenu, ItemSeat } from "@shared/ui";
import { useState, useRef, useEffect, useCallback } from "react";
import "./styles.scss";

type SeatPosition = {
  row: number;
  seat: number;
};

type Sector = "A" | "B" | "C" | "D" | "E";

export const HallManagement = () => {
  const ROWS_COUNT = 30;
  const SEATS_PER_ROW = 53;

  // Состояния для выделения
  const [selectionStart, setSelectionStart] = useState<SeatPosition | null>(
    null
  );
  const [selectionEnd, setSelectionEnd] = useState<SeatPosition | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<DOMRect | null>(null);
  const [startPosition, setStartPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  // Состояния для статусов мест
  const [disabledSeats, setDisabledSeats] = useState<Set<string>>(new Set());
  const [blockedSeats, setBlockedSeats] = useState<Set<string>>(new Set());
  const [tempBlockedSeats, setTempBlockedSeats] = useState<Set<string>>(
    new Set()
  );
  const [reservedSeats, setReservedSeats] = useState<Set<string>>(new Set());

  // Состояния для секторов
  const [currentSector, setCurrentSector] = useState<Sector>("A");
  const [seatsSectors, setSeatsSectors] = useState<Record<string, Sector>>(
    () => {
      const initialSectors: Record<string, Sector> = {};

      for (let row = 0; row < ROWS_COUNT; row++) {
        for (let seat = 0; seat < SEATS_PER_ROW; seat++) {
          initialSectors[`${row}-${seat}`] = "A";
        }
      }
      return initialSectors;
    }
  );

  // Состояние для меню
  const [isMenuFixed, setIsMenuFixed] = useState(true);

  // Рефы
  const hallRef = useRef<HTMLDivElement>(null);
  const lastRowRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const resetSelection = useCallback(() => {
    setSelectedSeats(new Set());
    setSelectionStart(null);
    setSelectionEnd(null);
    setIsSelecting(false);
    setSelectionBox(null);
    setStartPosition(null);
  }, []);

  // Обработчик событий клавиатуры
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        resetSelection();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [resetSelection]);

  // Получение места по координатам
  const getSeatAtPosition = useCallback((clientX: number, clientY: number) => {
    const element = document.elementFromPoint(clientX, clientY);
    if (!element || !element.closest(".item-seat")) return null;

    const seatElement = element.closest(".item-seat");
    const row = seatElement?.getAttribute("data-row");
    const seat = seatElement?.getAttribute("data-seat");

    return row && seat ? { row: parseInt(row), seat: parseInt(seat) } : null;
  }, []);

  // Обновление рамки выделения
  const updateSelectionBox = useCallback(
    (startX: number, startY: number, endX: number, endY: number) => {
      const left = Math.min(startX, endX);
      const top = Math.min(startY, endY);
      const width = Math.abs(endX - startX);
      const height = Math.abs(endY - startY);

      setSelectionBox(new DOMRect(left, top, width, height));
    },
    []
  );

  // Обработчики событий мыши
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return; // Только левая кнопка мыши

      const seat = getSeatAtPosition(e.clientX, e.clientY);

      if (seat) {
        setIsSelecting(true);
        setSelectionStart(seat);
        setSelectionEnd(seat);
        setSelectedSeats(new Set());
      } else {
        setIsSelecting(true);
        setSelectionStart(null);
        setSelectionEnd(null);
      }
      setStartPosition({ x: e.clientX, y: e.clientY });
    },
    [getSeatAtPosition]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isSelecting || !startPosition) return;

      updateSelectionBox(
        startPosition.x,
        startPosition.y,
        e.clientX,
        e.clientY
      );

      const seat = getSeatAtPosition(e.clientX, e.clientY);
      if (seat) {
        setSelectionEnd(seat);
      }
    },
    [isSelecting, startPosition, updateSelectionBox, getSeatAtPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (!selectionStart || !selectionEnd) {
      resetSelection();
      return;
    }

    const newSelectedSeats = new Set<string>();
    const minRow = Math.min(selectionStart.row, selectionEnd.row);
    const maxRow = Math.max(selectionStart.row, selectionEnd.row);
    const minSeat = Math.min(selectionStart.seat, selectionEnd.seat);
    const maxSeat = Math.max(selectionStart.seat, selectionEnd.seat);

    for (let row = minRow; row <= maxRow; row++) {
      for (let seat = minSeat; seat <= maxSeat; seat++) {
        newSelectedSeats.add(`${row}-${seat}`);
      }
    }

    setSelectedSeats(newSelectedSeats);
    setIsSelecting(false);
    setSelectionBox(null);
    setStartPosition(null);
  }, [selectionStart, selectionEnd, resetSelection]);

  // Подписка на глобальные события мыши
  useEffect(() => {
    if (isSelecting) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSelecting, handleMouseMove, handleMouseUp]);

  // Обработчик клика по месту
  const handleSeatClick = useCallback(
    (e: React.MouseEvent, rowIndex: number, seatIndex: number) => {
      e.stopPropagation();
      const seatKey = `${rowIndex}-${seatIndex}`;

      setSelectedSeats((prev) => {
        if (prev.has(seatKey) && prev.size === 1) {
          return new Set();
        }
        return new Set([seatKey]);
      });
    },
    []
  );

  // Проверка, выбрано ли место
  const isSeatSelected = useCallback(
    (rowIndex: number, seatIndex: number) => {
      if (isSelecting && selectionStart && selectionEnd) {
        const minRow = Math.min(selectionStart.row, selectionEnd.row);
        const maxRow = Math.max(selectionStart.row, selectionEnd.row);
        const minSeat = Math.min(selectionStart.seat, selectionEnd.seat);
        const maxSeat = Math.max(selectionStart.seat, selectionEnd.seat);

        return (
          rowIndex >= minRow &&
          rowIndex <= maxRow &&
          seatIndex >= minSeat &&
          seatIndex <= maxSeat
        );
      }

      return selectedSeats.has(`${rowIndex}-${seatIndex}`);
    },
    [isSelecting, selectionStart, selectionEnd, selectedSeats]
  );

  // Обработчик изменения диапазона мест
  const handleSeatRangeChange = useCallback((from: string, to: string) => {
    if (!from && !to) {
      setSelectedSeats(new Set());
      return;
    }

    const fromNum = parseInt(from);
    const toNum = parseInt(to);

    if (isNaN(fromNum)) return;

    const newSelectedSeats = new Set<string>();
    const start = Math.min(fromNum, toNum || fromNum);
    const end = Math.max(fromNum, toNum || fromNum);

    for (let seatNum = start; seatNum <= end; seatNum++) {
      const row = Math.floor((seatNum - 1) / SEATS_PER_ROW);
      const seat = (seatNum - 1) % SEATS_PER_ROW;

      if (row >= 0 && row < ROWS_COUNT && seat >= 0 && seat < SEATS_PER_ROW) {
        newSelectedSeats.add(`${row}-${seat}`);
      }
    }

    setSelectedSeats(newSelectedSeats);
  }, []);

  // Обработчик действий с местами
  const handleActionClick = useCallback(
    (action: "disable" | "block" | "temporaryBlock" | "reserve" | "clear") => {
      if (selectedSeats.size === 0) return;

      const updateStatus = (prev: Set<string>, shouldAdd: boolean) => {
        const newSet = new Set(prev);
        selectedSeats.forEach((seat) => {
          if (shouldAdd) newSet.add(seat);
          else newSet.delete(seat);
        });
        return newSet;
      };

      // Очищаем все статусы перед установкой нового
      setDisabledSeats((prev) => updateStatus(prev, action === "disable"));
      setBlockedSeats((prev) => updateStatus(prev, action === "block"));
      setTempBlockedSeats((prev) =>
        updateStatus(prev, action === "temporaryBlock")
      );
      setReservedSeats((prev) => updateStatus(prev, action === "reserve"));
    },
    [selectedSeats]
  );

  // Обработчик изменения сектора
  const handleSectorChange = useCallback(
    (sector: Sector) => {
      setCurrentSector(sector);

      if (selectedSeats.size > 0) {
        setSeatsSectors((prev) => {
          const newSeatsSectors = { ...prev };
          selectedSeats.forEach((seat) => {
            newSeatsSectors[seat] = sector;
          });
          return newSeatsSectors;
        });
      }
    },
    [selectedSeats]
  );

  // Получение иконки для места
  const getSeatIcon = useCallback(
    (rowIndex: number, seatIndex: number) => {
      const seatKey = `${rowIndex}-${seatIndex}`;

      if (disabledSeats.has(seatKey)) return "OFF";
      if (blockedSeats.has(seatKey)) return "BLOCK";
      if (tempBlockedSeats.has(seatKey)) return "TEMP_BLOCK";
      if (reservedSeats.has(seatKey)) return "BOOK";

      return null;
    },
    [disabledSeats, blockedSeats, tempBlockedSeats, reservedSeats]
  );

  // Intersection Observer для фиксации меню
  useEffect(() => {
    if (!lastRowRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsMenuFixed(!entry.isIntersecting),
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    observer.observe(lastRowRef.current);
    observerRef.current = observer;

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="hall-management-wrapper">
      <div
        className="hall-management"
        ref={hallRef}
        onMouseDown={handleMouseDown}
      >
        {selectionBox && isSelecting && (
          <div
            className="selection-box"
            style={{
              position: "fixed",
              left: `${selectionBox.x}px`,
              top: `${selectionBox.y}px`,
              width: `${selectionBox.width}px`,
              height: `${selectionBox.height}px`,
            }}
          />
        )}

        {Array.from({ length: ROWS_COUNT }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="hall-row"
            ref={rowIndex === ROWS_COUNT - 1 ? lastRowRef : null}
          >
            <div className="row-number left">{rowIndex + 1}</div>
            {Array.from({ length: SEATS_PER_ROW }).map((_, seatIndex) => {
              const seatNumber = rowIndex * SEATS_PER_ROW + seatIndex + 1;
              return (
                <ItemSeat
                  key={`seat-${rowIndex}-${seatIndex}`}
                  sector={seatsSectors[`${rowIndex}-${seatIndex}`]}
                  icon={getSeatIcon(rowIndex, seatIndex)}
                  isDisabled={disabledSeats.has(`${rowIndex}-${seatIndex}`)}
                  isSelected={isSeatSelected(rowIndex, seatIndex)}
                  onClick={(e) => handleSeatClick(e, rowIndex, seatIndex)}
                  data-row={rowIndex}
                  data-seat={seatIndex}
                  seatNumber={seatNumber}
                />
              );
            })}
            <div className="row-number right">{rowIndex + 1}</div>
          </div>
        ))}
      </div>
      <FloatingMenu
        selectedSeats={selectedSeats}
        onSeatRangeChange={handleSeatRangeChange}
        onActionClick={handleActionClick}
        onSectorChange={handleSectorChange}
        currentSector={currentSector}
        isFixed={isMenuFixed}
      />
    </div>
  );
};
