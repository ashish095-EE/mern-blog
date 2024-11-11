// // t=0:0.1:20
// // y=square(t);
// // subplot(2,1,1);
// // plot(t,y);
// // xlabel('t');
// // ylabel('x(t)');
// // title('continuous square function')
// // subplot(2,1,2);
// // stem(y);
// // xlabel('n');
// // ylabel('x[n]');
// // title('discontinuous square function')

// // t=0:0.1:20;
// // y=sawtooth(t);
// // subplot(2,1,1);
// // plot(t,y);
// // xlabel('t');
// // ylabel('x(t)');
// // title('continuous triangle function')
// // subplot(2,1,2);
// // stem(y);
// // xlabel('n');
// // ylabel('x[n]');
// // title('discontinuous triangle function')

// // t=0:0.1:20;
// // y=exp(t);
// // subplot(2,1,1);
// // plot(t,y);
// // xlabel('t');
// // ylabel('x(t)');
// // title('continuous exponential function')
// // subplot(2,1,2);
// // stem(y);
// // xlabel('n');
// // ylabel('x[n]');
// // title('discontinuous exponential function')

// // t=0:0.1:20;
// // y=sin(t);
// // subplot(2,1,1);
// // plot(t,y);
// // xlabel('t');
// // ylabel('x(t)');
// // title('continuous sine function')
// // subplot(2,1,2);
// // stem(y);
// // xlabel('n');
// // ylabel('x[n]');
// // title('discontinuous sine function')

// // t=0:0.1:20;
// // y=t;
// // subplot(2,1,1);
// // plot(t,y);
// // xlabel('t');
// // ylabel('r(t)');
// // title('continuous ramp function')
// // subplot(2,1,2);
// // stem(y);
// // xlabel('n');
// // ylabel('r[n]');
// // title('discontinuous ramp function')

// // t=0:0.01:20;
// // y=sign(t);
// // u=0.1.*(1+y);
// // subplot(2,1,1);
// // plot(t,u);
// // xlabel('t');
// // ylabel('u(t)');
// // title('continuous unit step function')
// // subplot(2,1,2);
// // stem(u);
// // xlabel('n');
// // ylabel('u[n]');
// // title('discontinuous unit step function')

// // t=0:0.1:20;
// // y=sign(t);
// // subplot(2,1,1);
// // plot(t,y);
// // xlabel('t');
// // ylabel('s(t)');
// // title('continuous signum function')
// // subplot(2,1,2);
// // stem(y);
// // xlabel('n');
// // ylabel('s[n]');
// // title('discontinuous signum function')

// // t=0:0.1:20;
// // y=1.0*(mod(floor(t),2)==0);
// // subplot(2,1,1);
// // plot(t,y);
// // xlabel('t');
// // ylabel('x(t)');
// // title('continuous square function')
// // subplot(2,1,2);
// // stem(y);
// // xlabel('n');
// // ylabel('x[n]');
// // title('discontinuous square function')

// t=0:0.1:20
// y=sign(t);
// y1=sign(t-0.001);
// i=y-y1;
// subplot(2,1,1);
// plot(t,i);
// xlabel('t');
// ylabel('x(t)');
// title('continuous impulse function')
// axis([-5 20 -2 2]);
// subplot(2,1,2);
// stem(i);
// xlabel('n');
// ylabel('x[n]');
// title('discontinuous impulse function')
// axis([-5 20 -2 2]);
