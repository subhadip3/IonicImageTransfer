#include <iostream>
using namespace std;
int k[1005],s[1005];
float t[1005];
int main()
{
	int T,n,d,i,j;
	float max,ans;
	cin>>T;

	
	
	while(T--)
	{
		cin>>d>>n;
		for(i=0;i<n;i++)
		{
			cin>>k[i]>>s[i];
			t[i]=(float)(d-k[i])/s[i];
		}
		max=t[0];
		for(i=1;i<n;i++)
		{
			if(t[i]>max)
			{
				max=t[i];
			}	
		}
		ans=d/max;
		cout<<ans<<endl;
		
	}
	return 0;
}