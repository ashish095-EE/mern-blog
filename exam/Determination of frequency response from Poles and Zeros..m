// 1.Consider a system
// // Poles s=[0,+j5,-j5]
// // Zeros at s=[-0.5+j10,-0.5-j10,-4,-6]
z=[0 1i*5 -1i*5];
p=[-0.5+1i*10 -0.5-1i*10 -4 -6];
k=2;
s_1=zpk(z,p,k);
s_2=tf(s_1);
w=-2*pi:0.001:2*pi;
h=freqresp(s_2,w);
h_1=squeeze(h);
subplot(3,1,1);
pzplot(s_2);
axis ([-8 2 -12 12]);
subplot(3,1,2);
plot(abs(h_1));
title('Magnitude Plot');
grid on
xlabel('\omega');
ylabel('h');
subplot(3,1,3)
plot(angle(h_1))
title('Phase Plot')
grid on
xlabel('\omega');
ylabel('angle(h)');