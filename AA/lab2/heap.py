from typing import List


class Heap:
    def __init__(self) -> None:
        self.items: List[int] = []

    def __len__(self) -> int:
        return len(self.items)

    def insert(self, value: int) -> None:
        self.items.append(value)
        self.heapify_up(len(self.items) - 1)

    def extract_min(self) -> int:
        if len(self.items) == 0:
            raise IndexError("Heap is empty")
        min_val = self.items[0]
        last_val = self.items.pop()
        if len(self.items) > 0:
            self.items[0] = last_val
            self.heapify_down(0)
        return min_val

    def heapify_up(self, index: int) -> None:
        parent = (index - 1) // 2
        if index <= 0:
            return
        elif self.items[index] < self.items[parent]:
            self.items[index], self.items[parent] = self.items[parent], self.items[index]
            self.heapify_up(parent)

    def heapify_down(self, index: int) -> None:
        left = 2 * index + 1
        right = 2 * index + 2
        smallest = index
        if len(self.items) > left and self.items[left] < self.items[smallest]:
            smallest = left
        if len(self.items) > right and self.items[right] < self.items[smallest]:
            smallest = right
        if smallest != index:
            self.items[smallest], self.items[index] = self.items[index], self.items[smallest]
            self.heapify_down(smallest)
