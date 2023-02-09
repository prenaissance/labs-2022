from decorators import benchmark
from concurrent.futures import ProcessPoolExecutor


def benchmark_dataset(function, set):
    return function.__name__, [benchmark(function)(n)["time"] for n in set]


def benchmark_single_thread(functions, set):
    calculations = map(benchmark_dataset, functions, [set] * len(functions))

    result = {}
    for name, times in calculations:
        result[name] = times

    return result


def benchmark_process_pool(functions, set):
    calculations = []

    with ProcessPoolExecutor() as executor:
        calculations = executor.map(benchmark_dataset, functions, set)

    result = {}
    for name, times in calculations:
        result[name] = times

    return result
