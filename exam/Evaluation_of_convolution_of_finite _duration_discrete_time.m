Convulation
n=0:1:3;
x=[1 2 1 4];
h=[3 2 1 4];
y=conv(x,h);
subplot(3,1,1);
stem(n,x)
xlabel('n');
ylabel('x');
title('n vs x');
axis([-10 10 0 5]);
subplot(3,1,2);
stem(n,h)
xlabel('n');
ylabel('h');
title('n vs h');
axis([-10 10 0 5]);
n1=0:1:6
subplot(3,1,3);
stem(n1,y)
xlabel('n1');
ylabel('y');
title('n1 vs y');
axis([-10 10 0 30]);

Commutative Property
n=0:1:3;
x=[1 2 1 4];
h=[3 2 1 4];
y=conv(x,h);
y1=conv(h,x);
subplot(3,1,1);
stem(n,x)
xlabel('n');
ylabel('x');
title('n vs x');
axis([-10 10 0 5]);
n1=0:1:6;
subplot(3,1,2);
stem(n1,y)
xlabel('n1');
ylabel('y');
title('n1 vs y');
axis([-10 10 0 30]);
subplot(3,1,3);
stem(n1,y1)
xlabel('n1');
ylabel('y1');
title('n1 vs y1');
axis([-10 10 0 30]);

Associative Property
n=0:1:3;
x=[1 2 1 2];
h1=[3 2 1 2];
h2=[4 1 3 2];
xlabel('n');
ylabel('x');
y=conv(x,h1);
ya=conv(y,h2);
y2=conv(h1,h2);
yb=conv(x,y2);
subplot(3,1,1);
stem(n,x)
title('n vs x');
axis([-15 15 0 5]);
n1=0:1:9;
subplot(3,1,2);
stem(n1,ya)
xlabel('n1');
ylabel('ya');
title('n1 vs ya');
axis([-15 15 0 110]);
subplot(3,1,3);
stem(n1,yb)
xlabel('n1');
ylabel('yb');
title('n1 vs yb');
axis([-15 15 0 110]);

Distributive Property
n=0:1:3;
x=[1 2 1 2];
h1=[3 2 1 2];
h2=[4 1 3 2];
h=h1+h2;
xlabel('n');
ylabel('x');
y1=conv(x,h1);
ya=conv(x,h);
y2=conv(x,h2);
yb=conv(x,y2);
subplot(3,1,1);
stem(n,x)
title('n vs x');
axis([-10 10 0 5]);
n1=0:1:6;
subplot(3,1,2);
stem(n1,ya)
xlabel('n1');
ylabel('ya');
title('n1 vs ya');
axis([-10 10 0 50]);
subplot(3,1,3);
stem(n1,y2);
xlabel('n1');
ylabel('y2');
title('n1 vs y2');
axis([-10 10 0 30]);

Identity Property
n=0:1:3;
x=[1 2 1 2];
h=1;
xlabel('n');
ylabel('x');
y=conv(x,h);
subplot(3,1,1);
stem(n,x)
title('n vs x');
axis([-5 5 0 5]);
subplot(3,1,2);
stem(n,x);
xlabel('n');
ylabel('y');
title('n vs y');
axis([-5 5 0 5]);
subplot(3,1,3);
stem(n,y);
xlabel('n');
ylabel('y');
title('n vs y');