#include<stdio.h>
#include<string.h>
#include<stdbool.h>

#define MAXCHAR 1000

int main(){

    FILE *fp;
    FILE *fp2;
    char row[MAXCHAR];
    char *token;
    int i, t = 0;
    fp = fopen("example.csv","r");
    fp2=fopen("exportTest.json","w");

    while (feof(fp) != true)
    {
        fgets(row, MAXCHAR, fp);
        //printf("Row: %s", row);

        token = strtok(row, ",");
 //  fprintf(fp2," ");
        while(token != NULL && t == 0)
        {
            if (i == 0)
            {
               fprintf(fp2,"\"%s\":",token);
                 token = strtok(NULL, ",");
                   printf("Token 1: %s\n", token);
            }
            if(i == 1){
               // token = strtok(NULL, ",");
                fprintf(fp2,"%s,",token);
                  token = strtok(NULL, ",");
                    printf("Token 2: %s\n", token);
            }
            else{
            printf("Token 3: %s\n", token);
           
           // fprintf(fp2,"%s,",token);
            
             if(token == NULL)
             {
               
                 t = 1;
             }
             token = strtok(NULL, ",");
            }


            i++;
        }
        
        i = 0;
    }
    return 0;

}
