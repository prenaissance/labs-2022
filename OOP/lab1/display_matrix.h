#include <stdio.h>
#include <stdlib.h>
#include "data_structures.h"

#ifndef DISPLAY_MATRIX_H
#define DISPLAY_MATRIX_H

#define ANSI_COLOR_RED "\x1b[31m"
#define ANSI_COLOR_GREEN "\x1b[32m"
#define ANSI_COLOR_YELLOW "\x1b[33m"
#define ANSI_COLOR_BLUE "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN "\x1b[36m"
#define ANSI_COLOR_RESET "\x1b[0m"

#define RED(x) ANSI_COLOR_RED x ANSI_COLOR_RESET
#define GREEN(x) ANSI_COLOR_GREEN x ANSI_COLOR_RESET
#define YELLOW(x) ANSI_COLOR_YELLOW x ANSI_COLOR_RESET
#define BLUE(x) ANSI_COLOR_BLUE x ANSI_COLOR_RESET
#define MAGENTA(x) ANSI_COLOR_MAGENTA x ANSI_COLOR_RESET
#define CYAN(x) ANSI_COLOR_CYAN x ANSI_COLOR_RESET

#define EMPTY_ROW "                         "
#define LINE_BREAK "-------------------------"

void clearMatrix(char *matrix[6][25])
{
    for (int i = 0; i < 6; i++)
    {
        for (int j = 0; j < 25; j++)
        {
            matrix[i][j] = "#";
        }
    }
}

void printMatrix(char *matrix[6][25])
{
    printf(EMPTY_ROW "\n" LINE_BREAK "\n" EMPTY_ROW "\n");
    for (int i = 0; i < 6; i++)
    {
        for (int j = 0; j < 25; j++)
        {
            printf("%s", matrix[i][j]);
        }
        printf("\n");
    }
}

// very non-scalable, should have made the macros actual functions
// and insert strategy into function pointer
void drawStack(char *matrix[6][25], int position, stack *st)
{
    int x = position * 8 + 4;
    int size = st->size;
    int *array = st->toArray(st);
    int y = 4;

    for (int i = 0; i < size; i++)
    {
        int width = array[i];
        switch (width)
        {
        case 1:
            matrix[y][x] = RED("@");
            break;
        case 3:
            for (int xTmp = x - 1; xTmp <= x + 1; xTmp++)
            {
                matrix[y][xTmp] = GREEN("@");
            }
            break;
        case 5:
            for (int xTmp = x - 2; xTmp <= x + 2; xTmp++)
            {
                matrix[y][xTmp] = YELLOW("@");
            }
            break;
        case 7:
            for (int xTmp = x - 3; xTmp <= x + 3; xTmp++)
            {
                matrix[y][xTmp] = BLUE("@");
            }
            break;
        }
        y--;
    }

    while (y >= 1)
    {
        matrix[y][x] = MAGENTA("|");
        y--;
    }
}

void drawState(char *matrix[6][25], stack *stacks[3])
{
    clearMatrix(matrix);
    drawStack(matrix, 0, stacks[0]);
    drawStack(matrix, 1, stacks[1]);
    drawStack(matrix, 2, stacks[2]);
}

#endif