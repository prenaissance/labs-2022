from typing import Callable, List
from heap import Heap
from math import log


def median(a: int, b: int, c: int) -> int:
    if a <= b <= c or c <= b <= a:
        return b
    elif b <= a <= c or c <= a <= b:
        return a
    else:
        return c


def quicksort(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)


def quicksort_median_pivot(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr
    first, middle, last = arr[0], arr[len(arr) // 2], arr[-1]
    pivot = median(first, middle, last)
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)


def merge_sort(arr: List[int]) -> List[int]:
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    left = merge_sort(left)
    right = merge_sort(right)

    return merge(left, right)


def merge(left: List[int], right: List[int]) -> List[int]:
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result += left[i:]
    result += right[j:]

    return result


def radix_sort(radix: int) -> Callable[[List[int]], List[int]]:
    def sort(numbers: List[int]) -> List[int]:
        max_number = max(numbers)
        exp = 1
        while exp <= max_number:
            buckets = [[] for _ in range(radix)]
            for number in numbers:
                digit = (number // exp) % radix
                buckets[digit].append(number)
            numbers = [number for bucket in buckets for number in bucket]
            exp *= radix
        return numbers
    return sort


def radix_in_place_sort(radix: int) -> Callable[[List[int]], List[int]]:
    def sort(numbers: List[int]) -> List[int]:
        arr = list(numbers)
        max_digits = int(log(max(arr), radix)) + 1
        for i in range(max_digits):
            buckets = [[] for _ in range(radix)]

            for num in arr:
                digit = (num // (radix ** i)) % radix
                buckets[digit].append(num)

            arr_idx = 0
            for bucket in buckets:
                for num in bucket:
                    arr[arr_idx] = num
                    arr_idx += 1
    return sort


def heap_sort(arr: List[int]) -> List[int]:
    heap = Heap()
    sorted_arr = []
    for i in arr:
        heap.insert(i)
    while len(heap) > 0:
        sorted_arr.append(heap.extract_min())
    return sorted_arr
