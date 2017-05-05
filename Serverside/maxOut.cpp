#include <iostream>
using namespace std;
int a[1000005];
int main()
{
	int T,max,max2,ans,flag;
	cin>>T;
	while(T--)
	{
		cin>>n;
		for(i=0;i<n;i++)
		{
			cin>>a[i];
		}
		max=a[0];
		for(i=1;i<n;i++)
		{
			if(a[i]>max)
				max=a[i];
			
		}

		max2=0;
		flag=0;
		for(i=0;i<n;i++)
		{
			if(a[i]>max2 && a[i]!=max)
			{
				flag=1;
				max2=a[i];
			}
		}
		if(flag==0)
		{
			ans=0;
		}
		else
		{
			ans=max2;
		}
		cout<<ans<<endl;

			
		

	}
}