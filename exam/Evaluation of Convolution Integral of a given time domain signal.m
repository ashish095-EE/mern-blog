syms t tau real;
x=1/(1+t^2);
subplot(2,1,1);
fplot(x);
title('input continuous time signal');
axis([-10 10 0 2])
f=subs(x,tau)*subs(x,t-tau);
y=int(f,tau,-inf,inf);
y1=simplify(y);
subplot(2,1,2);
fplot(y1);
title('the output of the convolution integral is');
axis([-10 10 0 2])
