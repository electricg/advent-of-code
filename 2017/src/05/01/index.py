def format(f):
    myList = []
    for line in f:
        myList.append(int(line.replace("\n", "")))
    return myList


def loop(jumps):
    steps = 0
    currentJumpIndex = 0

    while currentJumpIndex < len(jumps):
        steps = steps + 1
        currentJumpValue = jumps[currentJumpIndex]
        jumps[currentJumpIndex] = jumps[currentJumpIndex] + 1
        currentJumpIndex = currentJumpIndex + currentJumpValue

    return steps


def solution(file):
    f = open(file, "r")
    jumps = format(f)
    steps = loop(jumps)
    print(steps)

solution("input.txt")
