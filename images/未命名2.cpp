#include<string.h>
#include<stdio.h>
#include<stdlib.h>
#include<ctype.h>
 //定义关键字
#define ID 1
#define INT8 2
#define INT10 3
#define INT16 4
#define IDN 5
#define PLUS 6
#define MINUS 7
#define MULTI 8
#define RDIV 9
#define GT 10
#define LT 11
#define EQ 12
#define LR_BRAC 13
#define RR_BRAC 14
#define SEMIC 15
#define IF 16
#define THEN 17
#define ELSE 18
#define WHILE 19
#define DO 20
char *Key[10]={"if","then","else","while","do"};
char Word[20],ch;                   // 存储识别出的单词流

int IsAlpha(char c) {                //判断是否为字母
	if(((c<='z')&&(c>='a'))||((c<='Z')&&(c>='A'))) return 1;
	else return 0;
}
 
int IsNum(char c){                //判断是否为数字
	if(c>='0'&&c<='9') return 1;
	else return 0;
}

int Is81(char c){                //判断是否为数字
	if(c>='1'&&c<='7') return 1;
	else return 0;
}

int Is82(char c){                //判断是否为数字
	if(c>='0'&&c<='7') return 1;
	else return 0;
}

int Is16(char c){                //判断是否为数字
	if((c>='0'&&c<='9')||(c>='a'&&c<='f')) return 1;
	else return 0;
}
int IsKey(char *Word){
	int i,m;
	for(i=0;i<5;i++){
		if((m=strcmp(Word,Key[i]))==0) break;
	}
	switch(i){
	case 0: return 1;
	case 1: return 2;
	case 2: return 3;
	case 3: return 4;
	case 4: return 5;
	default: return 0;
	}          //识别关键字函数
 
}
void scanner(FILE *fp){        //扫描函数
	char Word[20]={'\0'};
	//char ch;
	int i,c;
	ch=fgetc(fp);        //获取字符，指针fp并自动指向下一个字符
	if(IsAlpha(ch)){            //判断该字符是否是字母
		Word[0]=ch;
		ch=fgetc(fp);
		i=1;
		while(IsNum(ch)||IsAlpha(ch)){   //判断该字符是否是字母或数字
			Word[i]=ch;
			i++;
			ch=fgetc(fp);
		   }
		Word[i]='\0';       //'\0' 代表字符结束(空格)
		fseek(fp,-1,1);                              //回退一个字符
		c=IsKey(Word);                              //判断是否是关键字
			switch(c){
				case 0: printf("%d\t%s\n\n",IDN,Word); break;
				case 1: printf("%d\n\n",IF); break;
				case 2: printf("%d\n\n",THEN); break;
				case 3: printf("%d\n\n",ELSE); break;
				case 4: printf("%d\n\n",WHILE); break;
				case 5: printf("%d\n\n",DO); break;
			}
	  }

      else                          //开始判断的字符不是字母
		    if(IsNum(ch)){   //判断是否是数字	           
			   Word[0]=ch;
			   ch=fgetc(fp);
			   i=1;
			   if(Word[0]=='0'){
			   	if(Is81(ch)){
			   		Word[i]=ch;
					 i++;
					 ch=fgetc(fp);
			   	 while(Is82(ch)){
					 Word[i]=ch;
					 i++;
					 ch=fgetc(fp);
				}
				 Word[i]='\0';
				 fseek(fp,-1,1);                    //回退
				 printf("%d\t%s\n\n",INT8,Word);
				
				 }
				 else if(ch=='x'){
				 	Word[i]=ch;
					 i++;
					 ch=fgetc(fp);
				 	 while(Is16(ch)){
					 Word[i]=ch;
					 i++;
					 ch=fgetc(fp);
				}
				 Word[i]='\0';
				 fseek(fp,-1,1);                    //回退
				 printf("%d\t%s\n\n",INT16,Word);
				 }
				 else{
				 	
				 Word[i]='\0';
				 fseek(fp,-1,1);                    //回退
				 printf("%d\t%s\n\n",INT10,Word);
				 	
				 	
				 	
				 }
			   	
			   	
			   }
			   else{
			   
			   while(IsNum(ch)){
					 Word[i]=ch;
					 i++;
					 ch=fgetc(fp);
				 }
			
				 Word[i]='\0';
				 fseek(fp,-1,1);                    //回退
				 printf("%d\t%s\n\n",INT10,Word);
			}
		   }
		   else         //开始判断的字符不是字母也不是数字
		   {
			   Word[0]=ch;
			   switch(ch){
			   	case '+': printf("%d\n\n",PLUS); break;
			   	case '-': printf("%d\n\n",MINUS); break;
			   	case '*': printf("%d\n\n",MULTI); break;
			   	case '/': printf("%d\n\n",RDIV); break;
			   	case '>': printf("%d\n\n",GT); break;
			   	case '<': printf("%d\n\n",LT); break;
			   	case '=': printf("%d\n\n",EQ); break;
			   	case '(': printf("%d\n\n",LR_BRAC); break;
			   	case ')': printf("%d\n\n",RR_BRAC); break;
			   	case ';': printf("%d\n\n",SEMIC); break;
			   	
			  
			   default:printf("无法识别字符!\n\n"); break;
			   }
		   }
}
main()
{
	char in_fn[30];                          //文件路径
    FILE *fp;
    printf("\n请输入源文件路径及后缀名(源文件需以'$'结尾):"); 
    while(1){
	gets(in_fn);
	//scanf("%s",in_fn);
    if((fp=fopen(in_fn,"r"))!=NULL)  break;  //读取文件内容，并返回文件指针，该指针指向文件的第一个字符
    else printf("文件路径错误!请重新输入:");
	}
 printf("\n词法分析结果如下:\n");
 do{
	 ch=fgetc(fp);
	 if(ch=='$')   break;         //文件以#结尾，作为扫描结束条件
	 else if(ch==' '||ch=='\t'||ch=='\n'){} //忽略空格，空白，和换行
	 else{
		 fseek(fp,-1,1);           //回退一个字节开始识别单词流
		 scanner(fp);
	 }
 }while(ch!='$');
 system("pause");
 return(0);
}

