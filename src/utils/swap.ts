function swap(arr: unknown[], from: number, to: number) {
  arr.splice(from, 1, arr.splice(to, 1, arr[from])[0])
}

export default swap
