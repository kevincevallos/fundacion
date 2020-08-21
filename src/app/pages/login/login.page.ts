import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LoginUser } from 'src/app/models/loginUser.model';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private usuario: LoginUser = {
    nombre: '',
    contrasena: '',
    pregunta1: '',
    pregunta2: ''
  }
  slideOptsFade;
  slideOptsCube;
  cargando: boolean;
  constructor(private servicio: DataService, private router: Router, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.comprobarSesionActual();
    this.fade();
    this.cube();
  }
  ionViewWillEnter() {
    this.cargando = false;
  }
  comprobarSesionActual() {
    if (this.servicio.getUsuarioActual()) {
      this.router.navigate(['/bienvenido']);
    }
  }
  fade() {
    this.slideOptsFade = {
      speed: 500,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      on: {
        beforeInit() {
          const swiper = this;
          swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
          const overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: true,
          };
          swiper.params = Object.assign(swiper.params, overwriteParams);
          swiper.params = Object.assign(swiper.originalParams, overwriteParams);
        },
        setTranslate() {
          const swiper = this;
          const { slides } = swiper;
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = swiper.slides.eq(i);
            const offset$$1 = $slideEl[0].swiperSlideOffset;
            let tx = -offset$$1;
            if (!swiper.params.virtualTranslate) tx -= swiper.translate;
            let ty = 0;
            if (!swiper.isHorizontal()) {
              ty = tx;
              tx = 0;
            }
            const slideOpacity = swiper.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
              : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
            $slideEl
              .css({
                opacity: slideOpacity,
              })
              .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
          }
        },
        setTransition(duration) {
          const swiper = this;
          const { slides, $wrapperEl } = swiper;
          slides.transition(duration);
          if (swiper.params.virtualTranslate && duration !== 0) {
            let eventTriggered = false;
            slides.transitionEnd(() => {
              if (eventTriggered) return;
              if (!swiper || swiper.destroyed) return;
              eventTriggered = true;
              swiper.animating = false;
              const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
              for (let i = 0; i < triggerEvents.length; i += 1) {
                $wrapperEl.trigger(triggerEvents[i]);
              }
            });
          }
        },
      }
    }
  }
  cube() {

    this.slideOptsCube = {
      grabCursor: true,
      speed: 500,
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      on: {
        beforeInit: function () {
          const swiper = this;
          swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

          const overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: false,
            virtualTranslate: true,
          };

          this.params = Object.assign(this.params, overwriteParams);
          this.originalParams = Object.assign(this.originalParams, overwriteParams);
        },
        setTranslate: function () {
          const swiper = this;
          const {
            $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
          } = swiper;
          const params = swiper.params.cubeEffect;
          const isHorizontal = swiper.isHorizontal();
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
          let wrapperRotate = 0;
          let $cubeShadowEl;
          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                $wrapperEl.append($cubeShadowEl);
              }
              $cubeShadowEl.css({ height: `${swiperWidth}px` });
            } else {
              $cubeShadowEl = $el.find('.swiper-cube-shadow');
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                $el.append($cubeShadowEl);
              }
            }
          }

          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            let slideIndex = i;
            if (isVirtual) {
              slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
            }
            let slideAngle = slideIndex * 90;
            let round = Math.floor(slideAngle / 360);
            if (rtl) {
              slideAngle = -slideAngle;
              round = Math.floor(-slideAngle / 360);
            }
            const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
            let tx = 0;
            let ty = 0;
            let tz = 0;
            if (slideIndex % 4 === 0) {
              tx = -round * 4 * swiperSize;
              tz = 0;
            } else if ((slideIndex - 1) % 4 === 0) {
              tx = 0;
              tz = -round * 4 * swiperSize;
            } else if ((slideIndex - 2) % 4 === 0) {
              tx = swiperSize + (round * 4 * swiperSize);
              tz = swiperSize;
            } else if ((slideIndex - 3) % 4 === 0) {
              tx = -swiperSize;
              tz = (3 * swiperSize) + (swiperSize * 4 * round);
            }
            if (rtl) {
              tx = -tx;
            }

            if (!isHorizontal) {
              ty = tx;
              tx = 0;
            }

            const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
            if (progress <= 1 && progress > -1) {
              wrapperRotate = (slideIndex * 90) + (progress * 90);
              if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
            }
            $slideEl.transform(transform$$1);
            if (params.slideShadows) {
              // Set shadows
              let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
              let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
              if (shadowBefore.length === 0) {
                shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
                $slideEl.append(shadowBefore);
              }
              if (shadowAfter.length === 0) {
                shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
                $slideEl.append(shadowAfter);
              }
              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
          }
          $wrapperEl.css({
            '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
            '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
            '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
            'transform-origin': `50% 50% -${swiperSize / 2}px`,
          });

          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
            } else {
              const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
              const multiplier = 1.5 - (
                (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
                + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
              );
              const scale1 = params.shadowScale;
              const scale2 = params.shadowScale / multiplier;
              const offset$$1 = params.shadowOffset;
              $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
            }
          }

          const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
          $wrapperEl
            .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
        },
        setTransition: function (duration) {
          const swiper = this;
          const { $el, slides } = swiper;
          slides
            .transition(duration)
            .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
            .transition(duration);
          if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
            $el.find('.swiper-cube-shadow').transition(duration);
          }
        },
      }
    }
  }
  next(slides) {
    slides.slideNext();
  }
  prev(slides) {
    slides.slidePrev();
  }
  iniciarSesion() {
    this.cargando = true;
    //
    this.servicio.iniciarSesion(this.usuario)
      .subscribe((res) => {
        var loged = JSON.stringify(res);
        localStorage.setItem('usuarioLogueado', loged);
        setTimeout(() => {
          this.cargando = false;
          this.router.navigate(['bienvenido']);
        }, 2000);
      },
        (err) => {
          this.cargando = false;
          this.notificarError();
        });
  }
  recuperarContrasena() {
    console.log(this.usuario);
    /* this.servicio.recuperarContrasena(this.usuario.nombrePerfil, this.usuario.contrasena).subscribe((res) => {
      console.log('Res_: ', res);
    }); */

  }
  async notificarError() {
    const toast = await this.toastCtrl.create({
      message: 'Los datos ingresados son incorrectos',
      duration: 3000,
      color: 'danger',
      cssClass: 'toastAlert'
    });
    toast.present();
  }
}
