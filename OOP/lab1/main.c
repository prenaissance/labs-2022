#include <stdio.h>
#include <stdlib.h>
#include "data_structures.h"
#include "display_matrix.h"
// for sleep function
#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif

void wrongMove(char *matrix[6][25])
{
    printMatrix(matrix);
    printf(RED("Wrong move! Read the rules or use") CYAN(" \"h\" ") RED("for help.") "\n");
}

void welcomeMessage(char *matrix[6][25])
{
    printMatrix(matrix);
    printf("Welcome to the game of Towers of Hanoi!\n");
    printf("Use" CYAN(" \"h\" ") "for the command list\n");
}

void gameWon(char *matrix[6][25])
{
    printMatrix(matrix);
    printf(GREEN("Congratulations! You won!"));
}

void printHelp(char *matrix[6][25])
{
    printMatrix(matrix);
    printf("Commands:\n");
    printf("  " CYAN("h") " - print this help\n");
    printf("  " CYAN("q") " - quit the game\n");
    printf("  " CYAN("m") " - move a disk\n");
    printf("  " CYAN("r") " - restart the game\n");
    printf("  " CYAN("u") " - undo the last move\n");
    printf("  " CYAN("s") " - show the solution\n");
}

int moveDisk(stack *from, stack *to)
{
    if (from->isEmpty(from))
    {
        return 0;
    }
    int disk = from->pop(from);
    if (to->size == 0 || disk < to->peek(to))
    {
        to->push(to, disk);
        return 1;
    }
    else
    {
        from->push(from, disk);
        return 0;
    }
}

void printScore(int moveCount, int undoCount)
{
    printf("Moves: " CYAN("%d") ", Undos: " CYAN("%d") "\n", moveCount, undoCount);
}

void solve(int n, stack *stacks[3], int from, int to, int aux, char *matrix[6][25])
{
    if (n == 1)
    {
        moveDisk(stacks[from], stacks[to]);
        drawState(matrix, stacks);
        printMatrix(matrix);
        sleep(1);
        return;
    }

    solve(n - 1, stacks, from, aux, to, matrix);
    moveDisk(stacks[from], stacks[to]);
    drawState(matrix, stacks);
    printMatrix(matrix);
    sleep(1);
    solve(n - 1, stacks, aux, to, from, matrix);
}

void gameLoop(char *matrix[6][25], stack *stacks[3], stack *undoMoves)
{
    char command;
    char fromStr[20], toStr[20];
    int from, to;
    int moveCount = 0;
    int undoCount = 0;
    int *move;

    while (1)
    {
        scanf("%c", &command);
        switch (command)
        {
        case 'h':
            printHelp(matrix);
            break;
        case 'q':
            return;
        case 'm':
            scanf("%s %s", fromStr, toStr);
            // printf("from: %d, to: %d", from, to);

            from = fromStr[0] - '0' - 1;
            to = toStr[0] - '0' - 1;
            if (moveDisk(stacks[from], stacks[to]))
            {
                undoMoves->push(undoMoves, from);
                undoMoves->push(undoMoves, to);
                moveCount++;
                drawState(matrix, stacks);
                printScore(moveCount, undoCount);
                if (stacks[2]->size == 4)
                {

                    gameWon(matrix);
                    return;
                }
                printMatrix(matrix);
            }
            else
            {
                wrongMove(matrix);
            }
            break;
        case 'r':
            moveCount = 0;
            undoCount = 0;
            for (int i = 0; i < 3; i++)
            {
                stacks[i]->dispose(stacks[i]);
            }

            stacks[0] = createStack();
            stacks[1] = createStack();
            stacks[2] = createStack();
            stacks[0]->push(stacks[0], 7);
            stacks[0]->push(stacks[0], 5);
            stacks[0]->push(stacks[0], 3);
            stacks[0]->push(stacks[0], 1);
            drawState(matrix, stacks);
            welcomeMessage(matrix);
            break;
        }
        if (command == 'u')
        {
            if (undoMoves->isEmpty(undoMoves))
            {
                printScore(moveCount, undoCount);

                printMatrix(matrix);
                printf(RED("No moves to undo!") "\n");
            }
            else
            {
                to = undoMoves->pop(undoMoves);
                from = undoMoves->pop(undoMoves);
                moveDisk(stacks[to], stacks[from]);
                moveCount--;
                undoCount++;
                drawState(matrix, stacks);
                printScore(moveCount, undoCount);
                printMatrix(matrix);
            }
        }
        if (command == 's')
        {
            for (int i = 0; i < 3; i++)
            {
                stacks[i]->dispose(stacks[i]);
            }
            stacks[0] = createStack();
            stacks[1] = createStack();
            stacks[2] = createStack();
            stacks[0]->push(stacks[0], 7);
            stacks[0]->push(stacks[0], 5);
            stacks[0]->push(stacks[0], 3);
            stacks[0]->push(stacks[0], 1);

            solve(4, stacks, 0, 2, 1, matrix);
            printf(GREEN("Solved in n^2 - 1 (15) moves!"));
            return;
        }
    }
}

int main()
{
    char *matrix[6][25];
    stack *st = createStack();
    st->push(st, 7);
    st->push(st, 5);
    st->push(st, 3);
    st->push(st, 1);

    stack *stacks[3] = {st, createStack(), createStack()};
    drawState(matrix, stacks);
    welcomeMessage(matrix);

    gameLoop(matrix, stacks, createStack());

    return 0;
}
