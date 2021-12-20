#include<stdio.h>
#include <stdlib.h>
#include<string.h>
#include<stdbool.h>

#define MAXCHAR 1000

int main(){

    FILE *fp;
    FILE *fp2;
    char row[MAXCHAR];
    char *token;
    //int i = 0;
    long double var = 0;
    fp = fopen("exportTest.csv","r");
    fp2=fopen("exportTest2.json","w");

    while (feof(fp) != true)
    {
        fgets(row, MAXCHAR, fp);
        //printf("Row: %s", row);

        token = strtok(row, ",");

        while(token != NULL)
        {

            if (&token[0] != NULL)
            {
               fprintf(fp2,"\"%s\":",token);
            }
            else if(&token[1] != NULL)
            {
                printf("Token: %s\n", token);
                var += atoll(token);

                 fprintf(fp2,"%s,",token);
                // fprintf(fp2,"Token Number: %lld\n", atoll(token));
                fprintf(fp2,",");
            }
            //i++;
           
            //token = strtok(NULL, ",");

        }
       // i=0;

    }
    
      printf("TOTAL : %Lf", var);
    return 0;

}
