const { v4: uuidv4 } = require('uuid');

const unId = uuidv4();
export function getCarWashes() {
	return [
		{
			path: 'abernathy-and-sons',
			name: 'Abernathy and Sons',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIdSURBVDjLpdNfSFNxFAfwX+GbSGjhg+JDED2YBYVGSPiQJigYRRZGUBD0UuBDT2rkIjOV/LsH5/5oIlE9yHSbFsy5TV3zH3soZcQWtD+CmjPXcru62f127q9YM8gH93D4wf1xPuece89lAFgy8d+LrtOyLGO2WudOe+t1pQ55LJnq0ea7+b1NVTmgMFCU7wmEmE1EmRewh4E3G0DeZwQz5hETNjD29CxHOCDPlR2MsnHtFjNFBTYOgVkQYVag7SuwIAD+GDBL51QY1pF++EzP8PLBKQm4wwHlsYZUkb2fQs86oPkG9FCMhgAbVTbQ6RB+P5cHoKguwNJEBzpuH5WALA5os9uPI+XDRw5c8gEVFPWrlERtWwmZoFDR3a3l7cHaAriHqqVkxF/idJrmMtKdPqioyhU/ULkEyFaAgSC1HgFGqAvFOjxNzqC19QK+vHu0G/AzbSOer31HHVW9QcBNAp7Q/K8JcEcB4w9AH8Jwiw7OgeuYlpdKwGIcCLMxPVXY4a2X0luvJegVJZs2AWXgJ0q8EZR4YjPX9BwYri+UgIa/e3DANovOANBPM7+gMbTU8kkXfQm76M2fdKB5rWqrzNV3JicTi31Xobp3QgKK4oDliFK9ygzhTWYWQ8wkrjDjtvmwxp64E5RQrLmfxztInH/PRfoHaNE9Pp8U8GlOUZEUwJPNrRfjK7wvYPDhOQmo2Q/Q/ecvlM5DiXe/ADHD2LkNLqYxAAAAAElFTkSuQmCC',
			location: '05 Anniversary Terrace',
			mapsLink: 'http://dummyimage.com/143x100.png/cc0000/ffffff',
		},
		{
			path: 'pfannerstill-inc',
			name: 'Pfannerstill Inc',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHHSURBVDjLjZPNSxtRFMX9WPk/VHBpoZRiJEtx0S5K20XFTVEKCq3g0hYXLhu6SjeFZJFNcSluxH03IiJocYINpgkYxEXSfDWTzMd7b2bs8d3XzviGRHTgMIt55zfnnpk7BGCIJK8HUgmp5B2akBqJfBogwTk3fd+/CoIAgySfI5PJfNUhOiBJZtu24ThOpG63i06ng3q9riC1Wg3ZbDaChOZhAtABxhiEEOpOsiwLpmmi0WgogOu6oJfkcrl/EB3gd/Pgf44VIISQodfrodls9o2kOtEBrLQGdrYSHZAjqbnDUVqtlkpSrVZvALz0bswuLMwaO0+/8eJ78NM34JU0vPYBAs+OQSgJ9dFut3XAck78WgUvf4B3kYY4/wR28hr2/hTYz/VYEhqHOiHQDaC4OMpP53Z5+aMEfJGAFNz8PFxjCYEvonE8z1O9EIQU68A8fvGY5V9CVFIQpQ3Ye4/gmYVYYZQiLJfSxADWj2fPmfEKzuETWPsPZfwExO/vyhSKEpDI3A84mnlrbE1uBrwFX4oVP4NfbveZdQ38jIN+Xz2FrtsAf2/bgwG6igD/IdOyIIce3Mcsz1pqezXAOEHusc6haPXHrwEWI98D8WYq8gAAAABJRU5ErkJggg==',
			location: '42 Jana Junction',
			mapsLink: 'http://dummyimage.com/103x100.png/dddddd/000000',
		},
		{
			path: 'rodriguez-group',
			name: 'Rodriguez Group',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAMfSURBVDjLpVNJaFNRFD0v/ydpM5imSZom/Ro7YNJqRVScQQV14wCtFRvRpYK4Edy4FIpgEetCRF0LDiCIoihCxWqtQ+mAsY2kDk0wP4lJrMQ0yZ99/VZRXPrhcd5/7w7n3nMf0TQN//Oxnafv13Bu28ACi4mDRgBNhUKDKpIEQZAgURQrAt0LkMsClEoZYrmCb9kZPh79uI0N1Nkj65cu5Bq9tXpEdZ6RompQ6dKDKar+ryiKjhLF0fHJ2idCIco2uKycx8IgFk9DphcjkWmsWxXC8FgMK5YtgiypGHs7jdbWxRgcjGDh4jo94BLOAU+9z8kS8jOrkSH4WlRRkglKihFfSxIev5zSjVXNABHVEIgJ+VwBAc4JWVVBqDM5dXVIM8hlGCg1YmCwfmUQM6KJUlXnywBlpuoOC9gS+vuHIRTzkEUJ2WQB7KuJ+KGQRzvjclgZj4fzMqZqwk9FwafzEGUFMl1zLCQF2L51DVramtQPE98jqe8F9X30dR/5JeOxvnvX1i5vDIeaAnDYLAjWGf6S68q9N6iyVCOby2BkOHL/+tmju+bOdat9PXcWuWpsHV6PCyLNZDP/q7e7xo538TycNS4Ybe4Nv+dgy4kbxKYKt0KbllSBsBBFEeMvXuDmZAROpxP5fB5dXV1wVNGGxftpRj+Cpi/O/eHjD9P82F5meugWRhOFy23NHEnOCJgYvIvyTBrhcBh+vx92ux0DAwPIJD+hc89ONDc3we2qBctUWpLJpJGdo1ERVUMq9w0vnw/BWZnG7oMHcLKnD9n4JPw+H9rb2/GFT+B83znwqRTcXBCHD3YgkUgc0QPIdFwl2unc5xgdFLtem7llB0rvxtDd3a2XUiwWkc1mceHiJbSGtug2DofDPM9ARLksor7eg3Q6rl+KUw9AoKG3txdWq1U/m52dhYFoSEUeAav3g5ZQ0WXcHO6Nev3ekCKVoKSGsHHtKvgbGmCpMiKTySAWi8FsNiMQCMDr9WK2JCDFfxaePXv6ifz5nIPBIOPz+dppxtu0gR7qxMxJncvlDlNMut3u2xSN9GUqPM9nKaOOH954iqSVHtHeAAAAAElFTkSuQmCC',
			location: '0 Oak Valley Junction',
			mapsLink: 'http://dummyimage.com/116x100.png/dddddd/000000',
		},
		{
			path: 'mcdermott-inc',
			name: 'McDermott Inc',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ2SURBVBgZBcFLiJVlGADg5/3+b87cbLyFNBJ4oexGQYqIi6hFQambgohoE0aLUqGCaBcuonWLUFe1CIJolWCLaiK1C0FUREpRBgmWNpqi4XjOnP97e57ITI+8fuLZ6bnJZ0rYhikECGSQzbi1M1cu5UJcvfzqycN7RgCRmXa9+dXJ9w5su6uUWJV0EoBMSIv/LXv/uyvOnx1eP/3zL2u+PLxnCBVKF3cMarfq1D+6EkGQjT6b8TgtLfceuv0mO7ZU37bFmWx3Xn5w/7HVx9/ePSwQESsysxt0xUShBl2hCyIoAs383MCe7fM23jY5Xedm34UCSUBBCUqEEqFEKBFKF/7+d8mGFcvuXhOe37lWN9E9CRUgk9oRQkZofVJC7Rhk8fulNGpjrY08sHlS1DKGCpkkahQpJaKEQDayKwwoLbTWSYUooEKiIYIQEolsTHSAKKIPWVJDJlChjcmkIZCZoBS0ULskgySFvtE3oEJrKTNJUgKQQAj950eMFg5ZPvebU+vW2zH9WGWnCn2jT7LRACRoyY2FI6ZOfeC+p54zuekeSz99YubkQv304YkDFdo4tUwHfxgJqQWZQSMjPX30Lbv3vmDqzBeceMPMylU2b9jg+1/z5Qrjca/vmZ+bsHVd0ZI+6YOWrL7yp6lbNrHrFQD14LyuxcYK42Fr49Zy1ItvzvVapBSgJetXzrv+4zGzR180XDrvOq5d7fSdvyos3+gvzA66m1+7dzSbmUXSACunq4vn9zt9/B23rp5WuwnXFsf+uNBJ/aHITNv3fbZvvJyPR8T9KWcAJImUHh0eq1sXP+zWDi/G1cHc8Oxgy8cvffT1E/8D2iAtJW5RUGAAAAAASUVORK5CYII=',
			location: '1154 Merry Parkway',
			mapsLink: 'http://dummyimage.com/248x100.png/5fa2dd/ffffff',
		},
		{
			path: 'prosacco-auer',
			name: 'Prosacco-Auer',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJHSURBVDjLfZJPa1NREMV/972ksYmx0bbUpzS1ValpKVQohgguRLuxIBRBcKMbwS/g2l026jfQpWtTcCEFN+Kii0AoSFNpQUirlFprXmybNi/v3nHxYv6Q6oFhLsydc+aeO+rWs8UX08nYkx7bigOIAGIQEcQImCCLMRgjFEuVt+9fzt+jgdC10fjT00PnAQukdbkra0H7PhcOardpQwgBRIEECjSUxAiiTaCsWyQ9Fqc6CB5dP8P4+DCfVnYZONVDtabb66SG4ywWfjCfcQBYWVEddUtEANjYOeTVYql5/hurm3vklrZY3dwj8EjofEIDNyb7AYhGbKIRm+RgL1++7bOxc8h8xuHnb4/joIrFoqRSKQCWl5epVCpEo1Fs2z62QUSoVqu1Uqn0oVAoPA8dbb9DTrwBI5TLs6TTaUKhEEop/gXP8yKO44waYx6HRPvQcL+vr49wOIy3vo4sLCC1GlYqhT19EWKrUPsKGKzIBM7Q7MTIyMhl++Gd/rM7h87M1i8bFbvCoFKobBZrdxe7XMZaW4OPS+iMjSVV0DVU/Tth26dcG7JVu6uFQkEmNjYglwtW0hgwhr25S8SvHoAyIBrEx05k+Lw9idVlkueB1uD7zYjnivh1C0w9CF0PyNu/sUkwNobSuqmO1uynz3HSPgDjNxp9IFi4rgnCU1N4yWRrAq2JztyEiANiAAO9w6iBue4JXNelrjXRbBY5OkI8DxWPE2zE3dbyKIXnebiu20mQz+cfGGNeJxKJmGVZ/A+u65LP5+//AbkTRxnEop0TAAAAAElFTkSuQmCC',
			location: '7 Wayridge Alley',
			mapsLink: 'http://dummyimage.com/241x100.png/dddddd/000000',
		},
		{
			path: 'schulist-frami-and-schinner',
			name: 'Schulist, Frami and Schinner',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALGSURBVDjLpZNdSNNRGMZ330V2GXXVRXVTICRd2IVIIFGSoJDWRUssRREJiswP1La16aab3x8tyoWl+T11tqmYmJbZh61pfvWFKZmoqZmp236dv1MxKrrowMP5n/95n+d5z3veIwNk/4PND1dz8z5nY2P0al1d0nJVVdhSebnXxt5cYeGO2ezsmGmtduyLUtnxOTn5+C8CLosl1tnQMONsseJsa2WlvpbF0lLHgtHoPVdQsHfWYLB/M91mtbuTH1YL0+lqxuLi7nyIitomkQOd5jrcQwMwMgQDDhgdZqW9jbn8/I8zen3/ktjHYYdHD0GISDEz+kzeyuVK2arZbHU/fwovn0FTI5jNUFMj1r24ertxdgpSbw/cugU3b0JREZSZcD59zHBo6Lhsubr6k3tkEKzNUCecagW5shLu3vUIPmgCo1GgBAoKBPIg24DrSRdvgoIWZKJYX9yD/VAvyBUVUH4PTCaPY8k6KU+QcnIEUQ8ZGaBR4+psp//YsTnZosk06nK8gmrhWnrbk+YGMTcXDAbQ6SA9HVQquJYG1xW4ujqw+/svyBZu3Cherr4PPV2e9La6abXCUQNKJaSmQnISXL4kjljGpEpBn69vsexrXt6emays90uSiFClpNDjJEFxTRBT1ohWVSSXc09zIesk51RH0YYd+v7Cx2fXWh9MqdUHJ1NTe+ezM3FJV1UjCphwFRITIP4KDSlnSas8R6Mjn74JG/qWaE7pD3A4ZqdusxMn4uO3j128qPgYHT0/byyGZnGdyUIkLpZwTQD1rw3UD4ijiaFrPY++NVISWPqtt9+Fhx8aOXPm8VSSILfboNXCiURvLA4jW4fZni8J/PmBDIWEeA0EBuY6AgLc4xFyjsTsdmpt4aht8jWy2ir/ewZbYffzCxaVjhOBymDdfjJtEWvO0iytf6nBvyCCNQLzUtrrs0b6/xNhTevE6BlD4wAAAABJRU5ErkJggg==',
			location: '985 Dunning Terrace',
			mapsLink: 'http://dummyimage.com/199x100.png/dddddd/000000',
		},
		{
			path: 'hills-morissette-and-volkman',
			name: 'Hills, Morissette and Volkman',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKnSURBVDjLdVJNSFRRFP7e+H7MZ06TyjCSDpZCaS93BpX9EUEEhUJkBS0KJDBoES6ibRujIqJcBUW0Khft2qQZtWigEYLBUgxz0BnHqWbUeTPv/3Xue/5k2eXdex73nO873zn3cK7r4tS1J61kX7pADi72uXTQNdjhG3d1O7YJU1+Yevfs5nZygYcf0EOBO5WWBm4+u+CBfQDgkzmgD/kFFSWdSFy+EcvLJwAOKi313JE99WiIKB6YoR0GZNbxs9duqUBFOY/9p69gHQF5Q0prFK8/TSKXK1I2x7t2VlQwSyT5xSI03cCfa7kEcLzIo3l3FE3hrbBteLJZZtumTYQW/Zc0Ey8GRzYiYIEOpucXIQYEaJpGjTI8ELu3UAZeEFEjS56qfwmYXBZIHdZ1HZ3tTb58X52X4OnbrzDLBfyFX1NgEoFtWkQSwPORMejePymwmAIOgijCsPymbkhgkdMwTRjUPzcggRMEIEAvwLFekM/maP+XADAtG5ZmoVgsQZ0ZQ9DIoDFcg2/JNNTqNkCSsTT1Eef2hjEdaUVvb29fIpEYWFNA7EZJQ3J0CG11m3D2wkWoqoodMzMYeh+D5pbh/JkuiAKPdDqNeDx+O5lM1q4rIZccR7O8hI6jJ9F36z5+fU+gLhKBoige6N7dO0il0oBYiRvXr4IIeviVgTGoBHU+iSqaRrbKW06g+CWO7u5uhEIhFAoFZLNZPHg4gB8F2YsJBoPSag/YwHC8jFQ64znzo6+8B+7v74cs+wBWUoADtm22NJZjdnZWWy0BgQDaDx/D5IdBDL8ZRtfxA5D4DmQyGUxMTECSJESjUYTDYRRLGheLxfKpVGqOY+BDlx49JnOZjS+MPCoLn1EXriaQSBMAjOeqYLkidoV+kgLXMXStROAsKer8DdsBr2sFe8jtAAAAAElFTkSuQmCC',
			location: '10378 American Ash Park',
			mapsLink: 'http://dummyimage.com/186x100.png/dddddd/000000',
		},
		{
			path: 'yost-LLC',
			name: 'Yost LLC',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ8SURBVDjLpZNLTBNRFIb/edgWamkLsylqsaASIDUEBHfCBqohcWG6UIM7YmJMNG5cuKkudGEMYQeJYqMbCZGFYVHrStMYTIm1RU3amsgjQVQaHsXSztt7p7YqlpWT3JyZO+f/zn/OnWF0Xcf/XPzOjVgsFlQUZVCWZZ5EkGgsSZJonPD7/ecqAhKJhJ0IHjgcDr/ZXA2RiKBpMPwRl06nA+Fw6Cx5+hcQj8dPUrEgCPusVivmF5ZBq2uaDk3XCEiHSmCiKFZugSSH3G63sZHPFyAT8fvEWwLQyquv/5TRRkUA7dFkMiGbzRYrqypa29qN6vqv6nTYuzqgZJWIaBI9FGo9EZ8lUTWq03eugdM4xEax9NQ3K64ujx2+9GH8LwfFWelGMgW0eTuM6iUXzOI0jncLsLdeOZaZGb4bu3NkueNG+nnZQQlgQEhlKqL3qzXz+JJ6jI6D+2Fv7kNuMYQ9tuZah1ucCl1tHGJLgLJY/T04CnqYuo8GpQC7dwDq9idYhHrw1YCrp726qdU9ajigwyl9kdQybUGnELJ3re4mhM0w5PUFsFwGDJuDqSYDFLbxY0Xkyi3QU+A4rti3SqeuwSQu4YD2EuZaAla+g9U2ANYGXZaQnEgVPqayF0sOopFIpNvj8cBms8FStQk+8xp1+Tdo6PVBl16AUbcwN70Fc27lG8cwSH/OXr7wZH6KKVkfGRkZIKdxy+VydXoam1C/No76zhOQMqPgeTuSr2RMRqvQm31XY7Fy6Hm0tEV1zM6/MRAI9BPQvTMtSe9RXxeUjRnMhdbxbM6Br5qQDAaDLX/mM7v9ztHhrtt7a51D22u5fDq9ev38WHqyUt5PJr6PrWVr/2QAAAAASUVORK5CYII=',
			location: '6154 Sunnyside Court',
			mapsLink: 'http://dummyimage.com/161x100.png/dddddd/000000',
		},
		{
			path: 'Homenick-LLC',
			name: 'Homenick LLC',
			logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJzSURBVDjLpZNLbxJRFMf7AfwEfA5YunTDTnwk3RlfMWFj4qKpKyfV2EVjhMwAUUyb1gYqCdWgQmqkRToFaRoLBcoUEGiB8hoQpgzPcpxzgREfO2/y39yc/++87p0CgKlJXTKCQpJKklrS9Ejq0Z3iz/hJ4wVJyofrda1954Tx78fZg8ghHwpH+e29GPvGk2JmbFUtxmDsb4CR+aLVm6dCh0muUKmDIHahdz4gajQ7kCtWwbcX5hY3khTGjiFjgBLN4dh3odXuAR6x04eq0AVe0lm7T+4EsQPbgaBgdh4hREkA2BeWjZnHZsduCYo/OlCoDZWvtSFXbcuQjU0fd3+1gO0oEKCys8cMlo2nXO/A1SdeeBcoymbNnAfuGiOkGjyx1CnQNj+DXgSofd+OWOwZS0XTlcdeSR5Y9xchy7ckwBYBVBpdqDd7UKqJsLT2nkUvAqaDBxEeh4UBCMCMqOvzfmCcGdBQW3DHECbVnVRa0Omdw6pljUcvAeyHwgSAAdgrmq893SGZDa5juPzIDbeZISBTbklVdGFp+bUMUH/ZjbI1oQ0NsUcyELOUFStKFUUJ8JkAcLC4mXi2BrTZIregsrgTTCZXgcEASAYN5SbmZEEkQvNNOkza6/YHsPk1CpTpozxExQNrWev2Bji+3pI3gcbEaRPi+aa8TjQnpOz6FyvcLVN8uMbxQ6LfhijHJ69QqJ6RSmpnPVJNuiSS9aE5nq2CzmwVZmnnr4c0+ZQXLAFqxebg/MEEZAp1MhPsOZrmweUNwQK9yM3oP/z9lCc/071Xae3cSxfzzLjM0gYT/1zP8PM6MzurszM3mNi/P9P/fOefb4UIeuRftTUAAAAASUVORK5CYII=',
			location: '19660 David Plaza',
			mapsLink: 'http://dummyimage.com/175x100.png/cc0000/ffffff',
		},
	];
}
