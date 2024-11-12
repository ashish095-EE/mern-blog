w=-2*pi:0.01*pi:2*pi;
n=0:20;
h=10.*0.8.^n;
subplot(3,1,1);
stem(n,h,'k','Linewidth',1.2);
title('impulse response of system h(n)');
xlabel('n');
ylabel('h(n)');
grid on
axis([-2 22 -1 20]);
q=exp(-1j*n'*w);
y=h*q;
subplot(3,1,2);
plot(w,abs(y),'k','linewidth',1.2);
title('magnitude plot');
xlabel('\omega');
ylabel('abs(y)');
grid on
subplot(3,1,3);
plot(w,angle(y),'k','linewidth',1.2);
title('phase plot');
xlabel('\omega');
ylabel('angle(y)');
grid on