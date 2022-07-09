jQuery(function($){
	$(document).ready(function(){
		var topHeight = $('.home > .top').outerHeight();
		const path = location.pathname
		$('.pc-header').addClass('position-middle')
		$('.position-middle').css('top', topHeight)
	});

	$(window).resize(function() {
		topHeight = $('.home > .top').outerHeight();
		const path = location.pathname
		$('.pc-header').addClass('position-middle')
		$('.position-middle').css('top', topHeight)
	});

	const path = location.pathname
	// トップページはヘッダーを途中で固定する
	let navPos = $('.home > .top').outerHeight();
	$(window).resize(function() {
		navPos = $('.home > .top').outerHeight();
	});
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > navPos) {
			$('.pc-header').addClass('fixed');
		} else {
			$('.pc-header').removeClass('fixed');
		}
	});

	// slick
	if ($('.works__list').length) {
		$('.works__list').slick({
			autoplay: true,
			slidesToShow: 3,
			arrows: false,
			autoplaySpeed: 0,
			speed: 8000,
			cssEase: 'linear',
			pauseOnFocus: false,//フォーカスが合っても止めない
			pauseOnHover: false,//hoverしても止めない
		});
		$(document).ready(function(){
			var windowSize = $(window).width();
			if ( 1440 < windowSize && windowSize < 2100 ) {
				$('.slick-arrow').addClass('x-fixed');
				$('.x-fixed').css('right', -((windowSize - 1140) / 2 - 80))
			} else if (windowSize < 1440){
				$('.x-fixed').css('right', '-6%')
			}
		});
		$(window).resize(function() {
			windowSize = $(window).width();
			if ( 1440 < windowSize && windowSize < 2100 ) {
				$('.slick-arrow').addClass('x-fixed');
				$('.x-fixed').css('right', -((windowSize - 1140) / 2 - 80))
			} else if (windowSize < 1440){
				$('.x-fixed').css('right', '-6%')
			}
		});
	};

	// swiper
	var sliderThumbnail = new Swiper('.slider-thumbnail', {
		slidesPerView: 4,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});

	var slider = new Swiper('.slider', {
		thumbs: {
			swiper: sliderThumbnail
		}
	});

	// アンカーリンク
	var windowWidth = $(window).width();
	var headerHight = 80;
	var urlHash = location.hash;
	if(urlHash) {
		$('body,html').stop().scrollTop(0);
		setTimeout(function(){
			var target = $(urlHash);
			var position = target.offset().top - headerHight;
			$('body,html').stop().animate({scrollTop:position}, 500);
		}, 100);
	}
	$('a[href^="#"]').click(function() {
		var speed = 1000;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top-headerHight;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});
	// アンカーリンクが、同一ページ内・外部アンカーリンクのどちらも対応していた場合の処理
	if (location.pathname == '/about/') {
		$('.anker-link').click(function() {
			var speed = 1000;
			var target = $($(this).data("link"));
			var position = target.offset().top-headerHight;
			$('body,html').animate({scrollTop:position}, speed, 'swing');
			return false;
		});
	}

	$('.nav__link > a').click(function() {
		let links = $('.nav__link')
		links.removeClass('active-nav')
		$(this).parent().addClass('active-nav')
	})

	// ハンバーガー
	$('.hamburger').click(function () {
		$('body').toggleClass('is-noScroll');
		$('html').toggleClass('html-is-noScroll');
		$('.hamburger__bar').toggleClass('close');
		$('.sp-menu').fadeToggle(500);
		if ($('.hamburger__title').text() === 'MENU') {
			$('.hamburger__title').text('CLOSE')
		} else {
			$('.hamburger__title').text('MENU')
		}
		$('.sp-header').toggleClass('close');
	});

	// ファーストビューの高さを取得
	// 1.関数の定義
	function setHeight() {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}
	// 2.初期化
	setHeight();
	// 3.ブラウザのサイズが変更された時・画面の向きを変えた時に再計算する
	window.addEventListener('resize', setHeight);

	// パララックス
	// let aboutPos = $('.home > .about').offset()
	// let aboutHeight = $('.home > .about').outerHeight()
	// $(window).on('scroll', function() {
	// 	if ($(this).scrollTop() > aboutPos.top && $(this).scrollTop() < (aboutPos.top + aboutHeight - 80)) {
	// 		$('.home > .news').css('margin-bottom', aboutHeight)
	// 		$('.home > .about').addClass('parallax-fixed')
	// 		$('.home > .parallax-fixed').css('top', (aboutPos.top - $(this).scrollTop()) * 1/3)
	// 	} else {
	// 		$('.home > .news').css('margin-bottom', 0)
	// 		$('.home > .about').removeClass('parallax-fixed')
	// 		$('.home > .parallax-fixed').css('top', 0)
	// 	}
	// });

	// コンタクトフォームのセレクトボックス未選択時の表示
	if ($('.wpcf7-select option[value=""]')) {
		$('.wpcf7-select option[value=""]').html( 'お問い合わせ種別をご選択ください' );
	}

	// コンタクトフォームでselectが未選択の場合、文字をグレーにする
	$('select').on('change', function () {
		if ($(this).val() === "") {
			$('.wpcf7-select').removeClass('select-option');
		} else {
			$('.wpcf7-select').addClass('select-option');
		}
	});

	// ふわっと表示
	function fadeAnime(){
		$('.fade-up').each(function(){
			var elemPos = $(this).offset().top + 100;
			var scroll = $(window).scrollTop();
			var windowHeight = $(window).height();
			if (scroll >= elemPos - windowHeight){
				$(this).addClass('fadeup');
				// 画面内に入ったらfadeInというクラス名を追記
			}
			// 何度もふわっとさせる時は下をコメントアウト外す
			// else{
			// 	$(this).removeClass('fadeup');
			// 	// 画面外に出たらfadeInというクラス名を外す
			// }
		})
	}
	// 画面をスクロールをしたら動かしたい場合の記述
	$(window).scroll(function (){
		fadeAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面をスクロールをしたら動かしたい場合の記述

	// 画面が読み込まれたらすぐに動かしたい場合の記述
	$(window).on('load', function(){
		fadeAnime();/* アニメーション用の関数を呼ぶ*/
	});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

});
