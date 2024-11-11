
// 1.Compute DTFT of x[n]=[2,-3,1,5,6,8] using FOR loop.
w=-2*pi:0.01*pi:2*pi;
n=-2:3;
x=[2 -3 1 5 6 8];
subplot(3,1,1);
stem(n,x,'k','linewidth',1.4);
title ('Discrete Signal x(n)');
xlabel ('n->');
ylabel('x(n)->');
axis ([-4 4 -5 10]);
grid on;
c1=1;
c2=1;
y=zeros(size(w));
for r=-2*pi:0.01*pi:2*pi
for n1=-2:3;
p=x(c1)*exp(-1j*r*n1);
y(c2)=p+y(c2);
c1=c1+1;
end
c2=c2+1;
c1=1;
end
subplot(3,1,2)
plot(w,abs(y),'k','linewidth',1.4);
title('Magnitude Plot of DTFT of x(n)');
xlabel('\omega->');
ylabel('abs(y)->');
grid on;
subplot(3,1,3);
plot(w,angle(y),'k','linewidth',1.4);
title('Phase Plot of DTFT of x(n)');
xlabel('\omega->');
ylabel('angle(v)->');
grid on;

2.Compute DTFT of x[n]=[2,-3,1,5,6,8] using MATLAB loop.
x = [2, -3, 1, 5, 6, 8];
N=1000;
omega = linspace(-2*pi, 2*pi, N);
X = zeros(size(omega));
for k = 1:length(omega)
X(k) = sum(x .* exp(-1i * omega(k) * (0:length(x)-1)));
end
subplot(3, 1, 1);
stem(0:length(x)-1, x,'k','linewidth',1.4);
title('Discrete Signal x[n]');
xlabel('n');
ylabel('x[n]');
axis([-1 6 -5 10])
grid on;
subplot(3, 1, 2);
plot(omega, abs(X),'k','linewidth',1.4);
title('Magnitude of DTFT');
xlabel('\omega');
ylabel('|X(e^{j\omega})|');
grid on;
subplot(3, 1, 3);
plot(omega, angle(X),'k','linewidth',1.4);
title('Phase of DTFT');
xlabel('\omega');
ylabel('arg(X(e^{j\omega}))');
grid on;

3.Compute DTFT of x[n]=u[n]-u[n-10].
n = 0:9;
x = heaviside(n) - heaviside(n - 10);
N = 1000;
omega = linspace(-2*pi, 2*pi, N);
X = zeros(size(omega));
for k = 1:length(omega)
X(k) = sum(x .* exp(-1i * omega(k) * n));
end
figure;
subplot(3, 1, 1);
stem(n, x, 'k','linewidth',1.4);
title('Discrete Signal x[n] = u[n] - u[n-10]');
xlabel('n');
ylabel('x[n]');
axis([-1 10 -0.5 1.5])
grid on;
subplot(3, 1, 2);
plot(omega, abs(X),'k','linewidth',1.4);
title('Magnitude Plot of DTFT of x(n)');
xlabel('\omega');
ylabel('|X(e^{j\omega})|');
grid on;
subplot(3, 1, 3);
plot(omega, angle(X),'k','linewidth',1.4);
title('Phase Plot of DTFT of x(n)');
xlabel('\omega');
ylabel('arg(X(e^{j\omega}))');
grid on;

// 4.Compute DTFT of x[n]=1;if -2<n<2 or else x[n]=0.
w=-2*pi:0.01*pi:2*pi;
n=-2:2;
x=ones(1,5);
subplot (3,1,1);
stem(n,x,'k','linewidth',1.4);
title ('Discrete Signal x(n)');
xlabel ('n->');
ylabel('x(n)');
axis ([-3 3 -0.5 1.5]);
grid on;
q=exp(-1j*n'*w);
y=x*q;
subplot(3,1,2);
plot(w,abs(y),'k','linewidth',1.4);
title ('Magnitude Plot of DTFT of x(n)');
xlabel('w->');
ylabel('abs(y)->');
grid on;
subplot(3,1,3);
plot(w,angle(y),'k','linewidth',1.2);
title ('Phase Plot of DTFT of x(n)');
xlabel('w->');
ylabel('angle(y)->');
grid on;
