x=[0 1 -0.7 0.1];
y=[1 1 0.31 0.03];
w=-2*pi:((2*pi)/100):2*pi;
h=freqz(x,y,w);
subplot(3,1,1);
plot(w,abs(h));
title('Magnitude Plot of the given signal');
grid on
xlabel('\omega');
ylabel('abs(h)');
subplot(3,1,2);
plot(w,angle(h));
title('phase Plot of the given signal');
grid on
xlabel('\omega');
ylabel('angle(h)');
subplot(3,1,3);
zplane(x,y);