/* ============================================================
   U POP TREND — kasting sayti
   Saytdagi barcha matnlar quyidagi DICT ichida (uz / ru / en).
   Bu yerda oʻzgartirsangiz, sahifaning hamma joyida yangilanadi.
   Standart til: UZ.
   teiior
   ============================================================ */

const DICT = {
  /* ---------------------------------------------------- UZ */
  uz: {
    meta_title: `U POP TREND — Milliy kasting`,
    meta_desc:  `14–19 yoshdagi yoshlar uchun milliy tanlov. Videongizni #UPOPTREND bilan joylang va anketani toʻldiring. Arizalar 1-oktabrgacha.`,
    skip: `Kastingga oʻtish`,

    nav_who: `Kim qatnashadi`,
    nav_how: `Bu qanday ishlaydi`,
    nav_cities: `Shaharlar va sanalar`,
    nav_faq: `Savollar`,
    nav_apply: `Anketani toʻldiring`,

    hero_title: `“Qadriyatlarning qayta tirilishi”`,
    hero_cta: `Anketani toʻldiring`,
    deadline: `Arizalar 2026-yil 1-oktabrgacha qabul qilinadi`,
chance_title: `Yoshingiz <span class="hl">14 dan 19 gacha!</span><br>Va siz jonli kuylay olasiz!<br>Demak, bu sizning sahnangiz!`,
    who_lede: `Oʻzbekiston tarixidagi ilk milliy kasting — tajriba va tayyorgarlikdan qat'i nazar, barcha uchun ochiq.`,

    stat1_num: `14–19`,
    stat1_label: `Ishtirokchilar yoshi`,
    stat2_label: `Oxirgi muddat`,
    stat3_label: `Milliy loyiha`,

    steps_title: `Sahnagacha <span class="hl">uch qadam</span>`,

    step1_title: `Video yozing`,
    step1_text: `Oʻzingizga xos uslubda istalgan xalq qoʻshigʻini ijro eting va videoni ijtimoiy tarmoqdagi shaxsiy sahifangizga joylang. Albatta #UPOPTREND xeshtegini qoʻying va @upoptrend sahifasini belgilang — aks holda tashkilotchilar arizangizni koʻrmaydi.`,

    step2_title: `Anketani toʻldiring`,
    step2_text: `Maʼlumotlaringizni qoldiring. Bu ikki daqiqadan kam vaqt oladi — tasdiq anketada koʻrsatilgan raqamga keladi.`,

    step3_title: `Milliy loyihaning bir qismiga aylaning`,
    step3_text: `Mamlakatning eng iqtidorli ovozlari milliy loyiha doirasida birlashadi. Ishtirokchilar professional prodyuserlar va ommaviy axborot vositalari eʼtiboriga tushib, katta sahnaga chiqish imkoniyatiga ega boʻladi.`,

    cities_title: `Kasting <span class="hl">respublika boʻylab</span> oʻtkaziladi`,
    cities_lede: `Besh shahar — besh sahna. Oʻzingizga qulayini tanlang.`,
    final_badge: `Katta final`,

    city1_name: `Fargʻona`,
    city1_date: `7-sentabr`,

    city2_name: `Xorazm`,
    city2_date: `9-sentabr`,

    city3_name: `Buxoro`,
    city3_date: `11-sentabr`,

    city4_name: `Samarqand`,
    city4_date: `13-sentabr`,

    city5_name: `Toshkent`,
    city5_date: `19–20-sentabr`,

    faq_title: `Koʻp beriladigan <span class="hl">savollar</span>`,

    q1: `Sahna tajribasi kerakmi?`,
    a1: `Yoʻq. Kasting 14 yoshdan 19 yoshgacha boʻlganlar uchun ochiq. Musiqa maktabi ham, avvalgi sahna tajribasi ham talab qilinmaydi, hakamlar ovoz va aktyorlik mahoratiga baho beradi.`,

    q2: `Ishtirok pullikmi?`,
    a2: `Yoʻq. Ishtirok barcha besh shaharda bepul. Tashkilotchilar hech bir bosqichda badal yigʻmaydi.`,

    q3: `Oʻzim bilan nima olib borishim kerak?`,
    a3: `Shaxsni tasdiqlovchi hujjat. Milliy yoʻnalishdagi asar ijrosiga tayyorgarlik koʻrish va a cappella kuylash.`,

    q4: `Istalgan shaharni tanlasa boʻladimi?`,
    a4: `Ha. Ishtirok doimiy roʻyxatga olingan manzilga bogʻliq emas — oʻzingizga qulay shaharni tanlang.`,

    q5: `Natijalar qachon maʼlum boʻladi?`,
    a5: `Tashkilotchilar saralashdan oʻtgan ishtirokchilar bilan anketada koʻrsatilgan telefon raqami orqali bogʻlanadi.`,

    q6: `Qanday qoʻshiqlarni ijro etish mumkin?`,
    a6: `Tanlovda faqat milliy qoʻshiqlar va folklor — maqom, baxshi, ashula, suvora, yalla, lapar va boshqa anʼanaviy janrlar — qatnashishga qabul qilinadi. Xorijiy hamda zamonaviy oʻzbek qoʻshiqlari koʻrib chiqilmaydi.`,

    q7: `Videoni joylashning oxirgi muddati qachon?`,
    a7: `Barcha ishtirokchilarning videolari 2026-yil 1-oktabrdan kechiktirmay joylashtirilishi kerak.`,

    eyebrow_apply: `Anketa`,
    form_kicker: `Sahnaga chiqishga tayyormisiz?`,
    form_card_title: `Milliy tanlov anketasi`,
    form_sub: `Anketani diqqat bilan toʻldiring — bu sizni sahnaga chiqishdan avval yaxshiroq bilishimizga yordam beradi.`,

    /* ---- anketa qadamlari ---- */
    wiz_back: `Orqaga`,
    wiz_next: `Keyingi`,
    err_fill: `Belgilangan (*) majburiy maydonlarni toʻldiring.`,
    err_email: `Toʻgʻri e-mail kiriting`,

    st1: `Shaxsiy`, st2: `Ota-ona`, st3: `Ijod`, st4: `Oʻzingiz`, st5: `Sogʻliq`, st6: `Logistika`, st7: `Rozilik`,
    sec1: `Shaxsiy maʼlumotlar`,
    sec2: `Ota-ona / qonuniy vakil`,
    sec3: `Ijodiy maʼlumot`,
    sec4: `Oʻzingiz haqingizda`,
    sec5: `Tibbiy maʼlumot`,
    sec6: `Logistika`,
    sec7: `Rozilik va tasdiqlash`,

    s1_city: `Kasting shahri`,
    s1_date_label: `Kasting sanasi`,
    s1_photo: `Suratingiz`,
    s1_photo_btn: `Rasm tanlash`,
    s1_photo_hint: `Yuzingiz toʻgʻridan-toʻgʻri koʻrinsin — koʻzoynak va bosh kiyimsiz, tekis fon, yaxshi yorugʻlikda. Yaqinda olingan aniq surat.`,
    err_photo: `Iltimos, suratingizni qoʻshing.`,
    s1_fullname: `F.I.Sh. (toʻliq)`,
    s1_fullname_ph: `Familiya Ism Sharif`,
    s1_birth: `Tugʻilgan sana`,
    s1_age: `Yosh`,
    s1_gender: `Jins`,
    gender_ph: `Tanlang`,
    gender_m: `Erkak`,
    gender_f: `Ayol`,
    s1_citizen: `Fuqarolik`,
    s1_region: `Yashash shahri / tumani`,
    s1_phone: `Telefon`,
    s1_email: `E-mail`,
    s1_socials: `Ijtimoiy tarmoqlar`,
    s1_agenote: `Ishtirokchilar anketa topshirish paytida 14 dan 19 yoshgacha boʻlishi shart.`,

    s2_note: `Barcha ishtirokchilar uchun toʻldirilishi shart.`,
    s2_name: `Ota-ona / vakil F.I.Sh.`,
    s2_relation: `Ishtirokchiga kimsiz?`,
    s2_relation_ph: `masalan, otasi`,
    s2_phone: `Telefon`,
    s2_email: `E-mail`,
    s2_consent: `Men ishtirokchining ota-onasi / qonuniy vakili ekanligimni tasdiqlayman va uning U-POP TREND kastingida ishtirok etishiga hamda materiallardan loyiha doirasida foydalanishga rozilik beraman.`,

    s3_rule_title: `Ijro qoidasi`,
    s3_rule: `Kastingning barcha bosqichlarida faqat milliy va folklor yoʻnalishidagi asarlar ijro etiladi (maqom, ashula, suvora, yalla, lapar, baxshi va boshqalar). Xorijiy hamda zamonaviy estrada qoʻshiqlari taqiqlanadi. Minusovka kerak emas — barcha ishtirokchilar a cappella kuylaydi.`,
    s3_agree: `Qoidalar bilan tanishdim va tayyorlagan asarim talablarga toʻliq javob berishini kafolatlayman.`,
    s3_piece: `Ijro etiladigan asar (nomi, muallifi)`,
    s3_genre: `Janr / yoʻnalish`,
    s3_genre_ph: `maqom, ashula, suvora, yalla, lapar, baxshi…`,
    genre_other: `Boshqa`,
    s3_edu: `Musiqiy maʼlumotingiz bormi? Qayerda?`,
    s3_instr: `Musiqa asbobida chalasizmi? Qaysi?`,
    s3_years: `Necha yildan beri kuylaysiz?`,
    s3_teacher: `Vokal ustozingiz bormi?`,
    s3_contests: `Tanlov / shoularda qatnashganmisiz? Natijangiz?`,
    s3_video: `Ijro videosiga havola (agar boʻlsa)`,

    s4_why: `Nega U-POP TREND’da ishtirok etmoqchisiz?`,
    s4_music: `Musiqa siz uchun nima?`,
    s4_words: `Uch soʻz bilan oʻzingizni taʼriflang`,
    s4_idol: `Kumiringiz / ilhomlantiruvchi`,
    s4_hobby: `Qiziqishlaringiz (musiqadan tashqari)`,
    s4_free: `Boʻsh vaqtdagi sevimli mashgʻulot`,
    s4_family: `Mening oilam`,
    s4_father: `Otam — F.I.Sh.`,
    s4_father_job: `Otamning ish joyi`,
    s4_mother: `Onam — F.I.Sh.`,
    s4_mother_job: `Onamning ish joyi`,
    s4_siblings: `Aka-uka / opa-singillar (ism, yosh)`,
    s4_livewith: `Kim bilan istiqomat qilasiz?`,
    s4_support: `Sizni kim koʻproq qoʻllaydi va nega?`,

    s5_chronic: `Surunkali kasalliklar / cheklovlar (agar boʻlsa)`,
    s5_allergy: `Allergiya (agar boʻlsa)`,
    s5_emergency: `Favqulodda holat uchun kontakt (F.I.Sh., telefon)`,

    s6_1: `Belgilangan shahar va vaqtda kastingga shaxsan boraman.`,
    s6_2: `Kastingdan oʻtsam, loyihaning keyingi barcha bosqichlarida qatnashishga tayyorman.`,
    s6_3: `Loyiha jadvaliga koʻra boshqa shaharlarga borish kerak boʻlishi mumkinligini tushunaman.`,

    s7_1: `Shaxsiy maʼlumotlarimni (anketadagi va boshqa) kasting va shou uchun qayta ishlashga rozilik beraman.`,
    s7_2: `Foto-, video-, audioyozuv hamda tasvir, ovoz va ijodiy materiallarimdan efir, promo va ijtimoiy tarmoqlarda qoʻshimcha toʻlovsiz foydalanishga rozilik beraman.`,
    s7_3: `U-POP TREND kastingi va loyihasining qoidalari bilan tanishdim va roziman.`,
    s7_4: `Anketadagi barcha maʼlumotlar haqqoniy ekanligini tasdiqlayman.`,
    s7_final: `Yuborishdan oldin maʼlumotlarni tekshiring. Kerak boʻlsa, «Orqaga» tugmasi orqali qayting.`,

    label_name: `Ism va familiya`,
    ph_name: `Ismingiz nima?`,

    label_age: `Yosh`,
    ph_age: `Yoshingiz`,

    label_city: `Kasting shahri`,
    city_ph: `Shaharni tanlang`,

    label_phone: `Telefon`,

    consent: `Shaxsiy maʼlumotlarim qayta ishlanishiga va UPOP TREND kastingi haqida maʼlumot olishga roziman`,

    err_name: `Ismingizni kiriting`,
    err_age: `Yosh 14–19 oraligʻida boʻlishi kerak`,
    err_city: `Shaharni tanlang`,
    err_phone: `Toʻgʻri telefon raqamini kiriting`,
    err_consent: `Davom etish uchun rozilik bering`,

    submit: `Anketani yuborish`,
    submit_loading: `Yuborilmoqda…`,

    success_title: `Anketa qabul qilindi`,
    success_text: `Arizangiz uchun rahmat! Saralashdan oʻtsangiz, anketada koʻrsatilgan raqam orqali siz bilan bogʻlanamiz. Tafsilotlarni upop.uz saytida kuzating.`,

    golden_title: `HAQIQIY ISTEDODLARNI QIDIRAMIZ!`,
    golden_subtitle: `Agar siz 14-19 yoshda boʻlsangiz va milliy madaniyatimizni chuqur bilsangiz - bu loyiha siz uchun!`,

    footer_details: `Barcha tafsilotlar — <a href="https://upop.uz" target="_blank" rel="noopener">upop.uz</a>`,
    footer_copy: `© 2026 UPOP TREND`,
    footer_credit: `Designed & Developed by <a href="https://teiior.uz" target="_blank" rel="noopener">teiior</a>`,
  },

  /* ---------------------------------------------------- RU */
  ru: {
    meta_title: `U POP TREND — Национальный кастинг`,
    meta_desc:  `Национальный конкурс для молодёжи 14-19 лет. Опубликуйте видео с #UPOPTREND и заполните анкету. Приём заявок до 1 октября.`,
    skip: `Перейти к заявке`,

    nav_who: `Кто участвует`,
    nav_how: `Как это работает`,
    nav_cities: `Города и даты`,
    nav_faq: `Вопросы`,
    nav_apply: `Заполнить анкету`,

    hero_title: `«Возрождение ценностей»`,
    hero_cta: `Заполнить анкету`,
    deadline: `Приём заявок до 1 октября 2026 года`,
    chance_title: `Вам <span class="hl">от 14-19 лет!</span><br>И вы умеете петь вживую?<br>Значит, это ваша сцена!`,
    who_lede: `Первый национальный кастинг в истории Узбекистана — открыт для всех, независимо от опыта и подготовки.`,

    stat1_num: `14–19`,
    stat1_label: `Возраст участников`,
    stat2_label: `Крайний срок`,
    stat3_label: `национальный проект`,

    steps_title: `Три шага <span class="hl">до сцены</span>`,

    step1_title: `Запишите видео`,
    step1_text: `Исполните любую народную песню в своём стиле и опубликуйте видео на личной странице в соцсетях. Обязательно поставьте хэштег #UPOPTREND и отметьте страницу @upoptrend — иначе организаторы не увидят вашу заявку.`,

    step2_title: `Заполните анкету`,
    step2_text: `Оставьте свои данные. Это займёт меньше двух минут — подтверждение придёт на номер, указанный в анкете.`,

    step3_title: `Станьте частью национального проекта`,
    step3_text: `Самые талантливые голоса страны объединятся в рамках национального проекта. Участники окажутся в поле внимания профессиональных продюсеров и СМИ и смогут выйти на большую сцену.`,

    cities_title: `Кастинг проходит <span class="hl">по всей республике</span>`,
    cities_lede: `Пять городов — пять сцен. Выбирайте, куда удобнее добраться.`,
    final_badge: `Большой финал`,

    city1_name: `Фергана`,
    city1_date: `7 сентября`,

    city2_name: `Хорезм`,
    city2_date: `9 сентября`,

    city3_name: `Бухара`,
    city3_date: `11 сентября`,

    city4_name: `Самарканд`,
    city4_date: `13 сентября`,

    city5_name: `Ташкент`,
    city5_date: `19–20 сентября`,

    faq_title: `Частые <span class="hl">вопросы</span>`,

    q1: `Нужен ли опыт выступлений?`,
    a1: `Нет. Кастинг открыт для всех в возрасте от 14-19 лет. Ни музыкальная школа, ни предыдущий сценический опыт не требуются — жюри оценивает вокальные и артистические способности.`,

    q2: `Участие платное?`,
    a2: `Нет. Участие бесплатное во всех пяти городах. Организаторы не собирают взносы ни на одном этапе.`,

    q3: `Что нужно взять с собой?`,
    a3: `Документ, удостоверяющий личность. Рекомендуется подготовить произведение национального направления и быть готовым исполнить его a cappella.`,

    q4: `Можно выбрать любой город?`,
    a4: `Да. Участие не зависит от места постоянной регистрации — выберите город, который вам удобнее.`,

    q5: `Когда будут известны результаты?`,
    a5: `Организаторы свяжутся с участниками, прошедшими отбор, по номеру телефона, указанному в анкете.`,

    q6: `Какие песни можно исполнять?`,
    a6: `К участию допускаются только национальные песни и фольклор — маком, бахши, ашула, сувора, ялла, лапар и другие традиционные жанры. Зарубежные и современные узбекские песни рассматриваться не будут.`,

    q7: `Какой крайний срок публикации видео?`,
    a7: `Все видео участников должны быть опубликованы не позднее 1 октября 2026 года.`,

    eyebrow_apply: `Анкета`,
    form_kicker: `Готовы выйти на сцену?`,
    form_card_title: `Анкета участника кастинга`,
    form_sub: `Заполни анкету внимательно — она поможет узнать тебя ещё до того, как ты выйдешь на сцену.`,

    /* ---- anketa qadamlari ---- */
    wiz_back: `Назад`,
    wiz_next: `Далее`,
    err_fill: `Заполните обязательные поля, отмеченные *.`,
    err_email: `Введите корректный e-mail`,

    st1: `Личные`, st2: `Родитель`, st3: `Творчество`, st4: `О себе`, st5: `Здоровье`, st6: `Логистика`, st7: `Согласия`,
    sec1: `Личные данные`,
    sec2: `Родитель / законный представитель`,
    sec3: `Творческая информация`,
    sec4: `О себе`,
    sec5: `Медицинская информация`,
    sec6: `Логистика`,
    sec7: `Согласия и подтверждение`,

    s1_city: `Город кастинга`,
    s1_date_label: `Дата кастинга`,
    s1_photo: `Ваше фото`,
    s1_photo_btn: `Выбрать фото`,
    s1_photo_hint: `Лицо анфас — без очков и головных уборов, ровный фон, хорошее освещение. Недавнее чёткое фото.`,
    err_photo: `Пожалуйста, добавьте фото.`,
    s1_fullname: `ФИО (полностью)`,
    s1_fullname_ph: `Фамилия Имя Отчество`,
    s1_birth: `Дата рождения`,
    s1_age: `Возраст`,
    s1_gender: `Пол`,
    gender_ph: `Выберите`,
    gender_m: `Мужской`,
    gender_f: `Женский`,
    s1_citizen: `Гражданство`,
    s1_region: `Город / регион проживания`,
    s1_phone: `Телефон`,
    s1_email: `E-mail`,
    s1_socials: `Соцсети`,
    s1_agenote: `На момент подачи анкеты участнику должно быть от 14-19 лет включительно.`,

    s2_note: `Обязательно к заполнению для всех участников.`,
    s2_name: `ФИО родителя / опекуна`,
    s2_relation: `Кем приходится участнику?`,
    s2_relation_ph: `например, отец`,
    s2_phone: `Телефон`,
    s2_email: `E-mail`,
    s2_consent: `Я подтверждаю, что являюсь родителем / законным представителем участника, и даю согласие на его участие в кастинге U-POP TREND и использование материалов в рамках проекта.`,

    s3_rule_title: `Правило исполнения`,
    s3_rule: `На всех этапах кастинга исполняются только национальные и фольклорные произведения (маком, ашула, сувора, ялла, лапар, бахши и др.). Зарубежная и современная эстрада запрещены. Минусовка не нужна — все участники поют a cappella.`,
    s3_agree: `Ознакомлен(а) с правилами и гарантирую, что подготовленное произведение полностью им соответствует.`,
    s3_piece: `Произведение для исполнения (название, автор)`,
    s3_genre: `Жанр / направление`,
    s3_genre_ph: `маком, ашула, сувора, ялла, лапар, бахши…`,
    genre_other: `Другое`,
    s3_edu: `Есть ли музыкальное образование? Где?`,
    s3_instr: `Играете на инструментах? На каких?`,
    s3_years: `Сколько лет поёте?`,
    s3_teacher: `Есть вокальный педагог?`,
    s3_contests: `Участвовали в конкурсах / шоу? С каким результатом?`,
    s3_video: `Ссылка на видео с исполнением (если есть)`,

    s4_why: `Почему вы хотите участвовать в U-POP TREND?`,
    s4_music: `Что музыка значит для вас?`,
    s4_words: `Три слова, которые описывают вас`,
    s4_idol: `Кумир / вдохновение`,
    s4_hobby: `Увлечения (кроме музыки)`,
    s4_free: `Любимое занятие в свободное время`,
    s4_family: `Моя семья`,
    s4_father: `Папа — ФИО`,
    s4_father_job: `Род деятельности отца`,
    s4_mother: `Мама — ФИО`,
    s4_mother_job: `Род деятельности матери`,
    s4_siblings: `Братья / сёстры (имена, возраст)`,
    s4_livewith: `С кем вы проживаете?`,
    s4_support: `Кто поддерживает вас больше всех и почему?`,

    s5_chronic: `Хронические заболевания / ограничения (если есть)`,
    s5_allergy: `Аллергии (если есть)`,
    s5_emergency: `Экстренный контакт (ФИО, телефон)`,

    s6_1: `Готов(а) присутствовать на кастинге лично в указанные дату и город.`,
    s6_2: `В случае прохождения готов(а) участвовать во всех последующих этапах проекта.`,
    s6_3: `Понимаю, что участие может потребовать выездов в другие города по графику проекта.`,

    s7_1: `Даю согласие на обработку персональных данных (указанных в анкете и иных) для проведения кастинга и производства шоу.`,
    s7_2: `Даю согласие на фото-, видео-, аудиосъёмку и использование изображения, голоса и материалов в эфире, промо и соцсетях без дополнительного вознаграждения.`,
    s7_3: `Ознакомлен(а) и согласен(на) с правилами и регламентом кастинга и проекта U-POP TREND.`,
    s7_4: `Подтверждаю, что все указанные в анкете данные достоверны.`,
    s7_final: `Перед отправкой проверьте данные. При необходимости вернитесь кнопкой «Назад».`,

    label_name: `Имя и фамилия`,
    ph_name: `Как вас зовут?`,

    label_age: `Возраст`,
    ph_age: `Ваш возраст`,

    label_city: `Город кастинга`,
    city_ph: `Выберите город`,

    label_phone: `Телефон`,

    consent: `Я согласен(на) на обработку моих персональных данных и получение информации о кастинге UPOP TREND`,

    err_name: `Введите имя`,
    err_age: `Возраст должен быть от 14-19 лет`,
    err_city: `Выберите город`,
    err_phone: `Введите корректный номер телефона`,
    err_consent: `Дайте согласие, чтобы продолжить`,

    submit: `Отправить анкету`,
    submit_loading: `Отправка…`,

    success_title: `Анкета принята`,
    success_text: `Спасибо за заявку! Если вы пройдёте отбор, мы свяжемся с вами по номеру из анкеты. Следите за деталями на upop.uz.`,

    golden_title: `ИЩЕМ НАСТОЯЩИЕ ТАЛАНТЫ!`,
    golden_subtitle: `Если вам от 14-19 лет и вы глубоко знаете нашу национальную культуру — этот проект для вас!`,

    footer_details: `Все подробности — <a href="https://upop.uz" target="_blank" rel="noopener">upop.uz</a>`,
    footer_copy: `© 2026 UPOP TREND`,
    footer_credit: `Designed & Developed by <a href="https://teiior.uz" target="_blank" rel="noopener">teiior</a>`,
  },

  /* ---------------------------------------------------- EN */
  en: {
    meta_title: `U POP TREND — National Casting`,
    meta_desc:  `A national contest for youth aged 14–19. Post your video with #UPOPTREND and fill in the form. Applications until 1 October.`,
    skip: `Skip to apply`,

    nav_who: `Who can join`,
    nav_how: `How it works`,
    nav_cities: `Cities & dates`,
    nav_faq: `FAQ`,
    nav_apply: `Fill in the form`,

    hero_title: `“The revival of values”`,
    hero_cta: `Fill in the form`,
    deadline: `Applications accepted until 1 October 2026`,
    chance_title: `Are you <span class="hl">14 to 19 years old?</span><br>And can you sing live?<br>Then this is your stage!`,
    who_lede: `The first national casting in Uzbekistan's history — open to everyone, regardless of experience or training.`,

    stat1_num: `14–19`,
    stat1_label: `Age of participants`,
    stat2_label: `Deadline`,
    stat3_label: `national project`,

    steps_title: `Three steps <span class="hl">to the stage</span>`,

    step1_title: `Record a video`,
    step1_text: `Perform any folk song in your own style and post the video on your personal social-media page. Be sure to add the hashtag #UPOPTREND and tag @upoptrend — otherwise the organizers won't see your entry.`,

    step2_title: `Fill in the form`,
    step2_text: `Leave your details. It takes under two minutes — a confirmation is sent to the number you provide in the form.`,

    step3_title: `Become part of the national project`,
    step3_text: `The country's most talented voices come together within a national project. Participants gain the attention of professional producers and the media, and a chance to step onto the big stage.`,

    cities_title: `The casting travels <span class="hl">across the republic</span>`,
    cities_lede: `Five cities — five stages. Pick the one easiest to reach.`,
    final_badge: `Grand final`,

    city1_name: `Fergana`,
    city1_date: `September 7`,

    city2_name: `Khorezm`,
    city2_date: `September 9`,

    city3_name: `Bukhara`,
    city3_date: `September 11`,

    city4_name: `Samarkand`,
    city4_date: `September 13`,

    city5_name: `Tashkent`,
    city5_date: `September 19–20`,

    faq_title: `Frequently asked <span class="hl">questions</span>`,

    q1: `Do I need stage experience?`,
    a1: `No. The casting is open to everyone aged 14–19. Neither music school nor previous stage experience is required — the jury evaluates vocal and performance skills.`,

    q2: `Is participation paid?`,
    a2: `No. Participation is free in all five cities. The organizers do not collect any fees at any stage.`,

    q3: `What should I bring with me?`,
    a3: `A valid identity document. Prepare a piece from the national tradition and be ready to perform it a cappella.`,

    q4: `Can I choose any city?`,
    a4: `Yes. Participation is not tied to your permanent registration address — choose whichever city is most convenient for you.`,

    q5: `When will the results be announced?`,
    a5: `The organizers will contact the selected participants using the phone number provided in the application.`,

    q6: `What songs can be performed?`,
    a6: `Only national songs and folklore are accepted — maqom, bakhshi, ashula, suvora, yalla, lapar and other traditional genres. Foreign and modern Uzbek songs will not be considered.`,

    q7: `What is the deadline to publish the video?`,
    a7: `All participants' videos must be published no later than 1 October 2026.`,

    eyebrow_apply: `Application`,
    form_kicker: `Ready to take the stage?`,
    form_card_title: `Casting application form`,
    form_sub: `Fill it in carefully — it helps us get to know you before you step on stage.`,

    /* ---- anketa qadamlari ---- */
    wiz_back: `Back`,
    wiz_next: `Next`,
    err_fill: `Please complete the required fields marked *.`,
    err_email: `Enter a valid email`,

    st1: `Personal`, st2: `Parent`, st3: `Creative`, st4: `About`, st5: `Health`, st6: `Logistics`, st7: `Consent`,
    sec1: `Personal details`,
    sec2: `Parent / legal guardian`,
    sec3: `Creative background`,
    sec4: `About you`,
    sec5: `Health information`,
    sec6: `Logistics`,
    sec7: `Consent & confirmation`,

    s1_city: `Casting city`,
    s1_date_label: `Casting date`,
    s1_photo: `Your photo`,
    s1_photo_btn: `Choose photo`,
    s1_photo_hint: `Face forward — no glasses or headwear, plain background, good lighting. A recent, clear photo.`,
    err_photo: `Please add your photo.`,
    s1_fullname: `Full name`,
    s1_fullname_ph: `First name, last name`,
    s1_birth: `Date of birth`,
    s1_age: `Age`,
    s1_gender: `Gender`,
    gender_ph: `Select`,
    gender_m: `Male`,
    gender_f: `Female`,
    s1_citizen: `Citizenship`,
    s1_region: `City / region of residence`,
    s1_phone: `Phone`,
    s1_email: `E-mail`,
    s1_socials: `Social media`,
    s1_agenote: `Participants must be between 14 and 19 years old at the time of applying.`,

    s2_note: `Required for every participant.`,
    s2_name: `Parent / guardian full name`,
    s2_relation: `Relation to the participant?`,
    s2_relation_ph: `e.g. father`,
    s2_phone: `Phone`,
    s2_email: `E-mail`,
    s2_consent: `I confirm that I am the participant's parent / legal guardian and consent to their participation in the U-POP TREND casting and the use of materials within the project.`,

    s3_rule_title: `Performance rule`,
    s3_rule: `Only national and folk repertoire is performed at every stage (maqom, ashula, suvora, yalla, lapar, baxshi and others). Foreign and modern pop songs are not allowed. No backing track — everyone sings a cappella.`,
    s3_agree: `I have read the rules and guarantee my prepared piece fully meets them.`,
    s3_piece: `Piece to perform (title, author)`,
    s3_genre: `Genre / style`,
    s3_genre_ph: `maqom, ashula, suvora, yalla, lapar, baxshi…`,
    genre_other: `Other`,
    s3_edu: `Any musical education? Where?`,
    s3_instr: `Do you play instruments? Which ones?`,
    s3_years: `How many years have you been singing?`,
    s3_teacher: `Do you have a vocal coach?`,
    s3_contests: `Have you taken part in contests / shows? With what result?`,
    s3_video: `Link to a performance video (if any)`,

    s4_why: `Why do you want to take part in U-POP TREND?`,
    s4_music: `What does music mean to you?`,
    s4_words: `Three words that describe you`,
    s4_idol: `Your idol / inspiration`,
    s4_hobby: `Hobbies (besides music)`,
    s4_free: `Favourite free-time activity`,
    s4_family: `My family`,
    s4_father: `Father — full name`,
    s4_father_job: `Father's occupation`,
    s4_mother: `Mother — full name`,
    s4_mother_job: `Mother's occupation`,
    s4_siblings: `Siblings (names, ages)`,
    s4_livewith: `Who do you live with?`,
    s4_support: `Who supports you the most, and why?`,

    s5_chronic: `Chronic conditions / limitations (if any)`,
    s5_allergy: `Allergies (if any)`,
    s5_emergency: `Emergency contact (name, phone)`,

    s6_1: `I will attend the casting in person on the given date and in the given city.`,
    s6_2: `If selected, I am ready to take part in all further stages of the project.`,
    s6_3: `I understand participation may require travelling to other cities per the project schedule.`,

    s7_1: `I consent to the processing of my personal data (in this form and otherwise) for the casting and the production of the show.`,
    s7_2: `I consent to photo, video and audio recording and to the use of my image, voice and materials on air, in promo and on social media without additional payment.`,
    s7_3: `I have read and agree to the rules and regulations of the U-POP TREND casting and project.`,
    s7_4: `I confirm that all information in this form is accurate.`,
    s7_final: `Please review your answers before sending — use "Back" if you need to edit.`,

    label_name: `Full name`,
    ph_name: `What is your name?`,

    label_age: `Age`,
    ph_age: `Your age`,

    label_city: `Casting city`,
    city_ph: `Select a city`,

    label_phone: `Phone`,

    consent: `I consent to the processing of my personal data and to receiving information about the UPOP TREND casting`,

    err_name: `Enter your name`,
    err_age: `Age must be between 14 and 19`,
    err_city: `Choose a city`,
    err_phone: `Enter a valid phone number`,
    err_consent: `Please give your consent to continue`,

    submit: `Submit application`,
    submit_loading: `Sending…`,

    success_title: `Application received`,
    success_text: `Thank you for your application! If you pass the selection, we'll contact you using the number from the form. Follow updates at upop.uz.`,

    golden_title: `WE ARE LOOKING FOR REAL TALENTS!`,
    golden_subtitle: `If you are between 14 and 19 years old and deeply know our national culture - this project is for you!`,

    footer_details: `All details — <a href="https://upop.uz" target="_blank" rel="noopener">upop.uz</a>`,
    footer_copy: `© 2026 UPOP TREND`,
    footer_credit: `Designed & Developed by <a href="https://teiior.uz" target="_blank" rel="noopener">teiior</a>`,
  },
};

/* ============================================================
   Tarjima mexanizmi
   ============================================================ */

const LANGS = ["uz", "ru", "en"];
const LS_KEY = "upop_lang";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   Google Sheets backend (UPOP_casting)
   Joylangan Apps Script Web App manzilini (…/exec) shu yerga qoʻying.
   Oʻrnatish: google-apps-script/SETUP.md
   "" qoldirilsa saqlash oʻchadi (forma koʻrib chiqish uchun ishlayveradi).
   ============================================================ */
const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycby7z5nB-DfFxk6tBGVCFkMQNpPCdNbHI9DSURAMYiUt8GKPasqRNULcyG-A3lZzZzEIwQ/exec";

/* Har ariza uchun bitta barqaror id — qayta yuborilsa ham takror qator paydo
   boʻlmaydi (Apps Script shu id boʻyicha tekshiradi). Yuborish muvaffaqiyatli
   boʻlguncha saqlanib turadi. */
const SUBMISSION_ID_KEY = "upop_submission_id";
function getSubmissionId() {
  let id = "";
  try { id = localStorage.getItem(SUBMISSION_ID_KEY) || ""; } catch (_) {}
  if (!id) {
    id =
      (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
      "upop-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
    try { localStorage.setItem(SUBMISSION_ID_KEY, id); } catch (_) {}
  }
  return id;
}
function clearSubmissionId() {
  try { localStorage.removeItem(SUBMISSION_ID_KEY); } catch (_) {}
}

function getLang() {
  const saved = localStorage.getItem(LS_KEY);
  return LANGS.includes(saved) ? saved : "uz";
}

function applyLang(lang) {
  const dict = DICT[lang];
  if (!dict) return;

  document.documentElement.lang = lang;
  document.title = dict.meta_title;

  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", dict.meta_desc);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n")];
    if (v != null) el.textContent = v;
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-html")];
    if (v != null) el.innerHTML = v;
  });

  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-ph")];
    if (v != null) el.setAttribute("placeholder", v);
  });

  // Til tanlash roʻyxatlarini sinxronlaymiz
  document.querySelectorAll(".langswitch-select").forEach((select) => {
    select.value = lang;
  });

  localStorage.setItem(LS_KEY, lang);
}

/* ============================================================
   Ishga tushirish
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  applyLang(getLang());

  // Hero kirish animatsiyasi. Sinxron qoʻshiladi — orqa fondagi brauzer
  // varagʻida ham ishlasin (u yerda requestAnimationFrame toʻxtab turadi).
  document.body.classList.add("is-ready");

  initLangSwitch();
  initNavStuck();
  initMobileMenu();
  initReveal();
  initSectionFx();
  initAccordion();
  initMagnetic();
  initForm();
  initPhoto();

  // URL biror boʻlimga ishora qilmasa, sahifani eng yuqoridan ochamiz.
  if (!location.hash) window.scrollTo(0, 0);
});

// Orqaga/oldinga (bfcache) qaytganda ham tiklaymiz — sahifa aylantirilgan holda ochilmasin.
window.addEventListener("pageshow", (e) => {
  if (e.persisted && !location.hash) window.scrollTo(0, 0);
});

/* ---------- til almashtirish ---------- */

function initLangSwitch() {
  document.querySelectorAll(".langswitch-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      applyLang(e.target.value);
    });
  });
}

/* ---------- nav: aylantirilgach shisha fon ---------- */

function initNavStuck() {
  const nav = document.getElementById("nav");

  if (!nav) return;

  const sentinel = document.createElement("div");

  sentinel.setAttribute("aria-hidden", "true");

  sentinel.style.cssText =
    "position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;";

  document.body.prepend(sentinel);

  new IntersectionObserver(
    ([e]) => nav.classList.toggle("is-stuck", !e.isIntersecting),
    {
      rootMargin: "-8px 0px 0px 0px",
    }
  ).observe(sentinel);
}

/* ---------- mobil menyu ---------- */

function initMobileMenu() {
  const burger = document.querySelector(".nav__burger");
  const menu = document.getElementById("mobileMenu");

  if (!burger || !menu) return;

  const toggle = (open) => {
    const isOpen = open ?? !menu.classList.contains("is-open");

    menu.classList.toggle("is-open", isOpen);
    menu.hidden = !isOpen;

    burger.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  };

  burger.addEventListener("click", () => toggle());

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => toggle(false));
  });
}

/* ---------- aylantirganda paydo boʻlish, ketma-ketlik, sanash, karvon chizigʻi ---------- */

function initReveal() {
  // Guruhlangan elementlarni CSS ketma-ketligi uchun raqamlaymiz.
  document
    .querySelectorAll(
      ".caravan .stop, .steplist .step, .stats .stat, .accordion .ac"
    )
    .forEach((el) => {
      const siblings = [...el.parentElement.children].filter(
        (c) =>
          c.classList.contains(el.classList[0]) ||
          c.classList.contains("stop") ||
          c.classList.contains("step") ||
          c.classList.contains("stat") ||
          c.classList.contains("ac")
      );

      el.style.setProperty("--i", siblings.indexOf(el));
    });

  // Qoʻshni elementlar bir xil kirmasin deb turli yoʻnalishlar beramiz.
  const stat = [
    "reveal--left",
    "reveal--scale",
    "reveal--right",
  ];

  document.querySelectorAll(".stats .stat").forEach((el, i) => {
    el.classList.add(
      "reveal",
      stat[i % 3]
    );
  });

  // qadamlar navbatma-navbat ikki tomondan kiradi (01 chapdan, 02 oʻngdan, 03 chapdan)
  document.querySelectorAll(".steplist .step").forEach((el, i) => {
    el.classList.add(i % 2 ? "reveal--right" : "reveal--left");
  });

  document.querySelectorAll(".accordion .ac").forEach((el) => {
    el.classList.add("reveal--left");
  });

  document.querySelectorAll(".caravan .stop").forEach((el) => {
    el.classList.add("reveal--scale");
  });

  document
    .querySelector(".who__text .h-display")
    ?.classList.add("reveal--blur");

  document
    .querySelector(".apply__kicker")
    ?.classList.add("reveal--blur");

  document
    .querySelector(".apply .card")
    ?.classList.add("reveal--scale");

  if (reduceMotion) {
    document
      .querySelectorAll(".reveal")
      .forEach((el) => el.classList.add("is-in"));

    document
      .querySelector(".caravan")
      ?.classList.add("is-in");

    runCountUps(true);

    return;
  }

  // Ikki yoʻnalishli: element koʻringanda is-in qoʻshiladi, yoʻqolganda olinadi —
  // yuqoriga ham, pastga ham aylantirganda qayta oʻynaydi.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;

        if (entry.isIntersecting) {
          // Yoʻnalish faqat oddiy paydo boʻlishlarda hisobga olinadi.
          if (!/reveal--/.test(el.className)) {
            const top = entry.rootBounds
              ? entry.rootBounds.top
              : 0;

            el.classList.toggle(
              "from-above",
              entry.boundingClientRect.top < top
            );
          }

          el.classList.add("is-in");

          if (el.classList.contains("stat")) {
            runCountUps(false);
          }
        } else {
          el.classList.remove("is-in");
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -6% 0px",
    }
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => io.observe(el));

  // Karvon chizigʻi ikki yoʻnalishda chiziladi va oʻchadi; u .reveal emas.
  const caravan = document.querySelector(".caravan");

  if (caravan) {
    io.observe(caravan);
  }
}

let countsDone = false;

function runCountUps(instant) {
  if (countsDone) return;

  countsDone = true;

  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.dataset.count, 10);

    if (instant || reduceMotion) {
      el.textContent = String(target);
      return;
    }

    const dur = 900;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min(
        1,
        (now - start) / dur
      );

      const eased =
        1 - Math.pow(1 - p, 3);

      el.textContent = String(
        Math.round(eased * target)
      );

      if (p < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  });
}

/* ---------- rang sayohati: body ga faol boʻlim belgisi ---------- */

function initSectionFx() {
  const map = [
    [".hero", "hero"],
    ["#who", "who"],
    ["#how", "how"],
    ["#cities", "cities"],
    ["#faq", "faq"],
    ["#apply", "apply"],
  ];

  const secs = map
    .map(([sel, k]) => [
      document.querySelector(sel),
      k,
    ])
    .filter(([el]) => el);

  const set = (k) => {
    document.body.className = document.body.className
      .replace(/\bsec-\w+/g, "")
      .trim();

    document.body.classList.add(
      "sec-" + k
    );

    // Oltin ajratishni yordamchi texnologiyalar uchun ham takrorlaymiz.
    document.querySelectorAll(".nav__desktop a").forEach((a) => {
      if (a.getAttribute("href") === "#" + k) {
        a.setAttribute("aria-current", "true");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  };

  set("hero");

  const io = new IntersectionObserver(
    (ents) =>
      ents.forEach((e) => {
        if (!e.isIntersecting) return;

        const hit = secs.find(
          ([el]) => el === e.target
        );

        if (hit) {
          set(hit[1]);
        }
      }),
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0,
    }
  );

  secs.forEach(([el]) => io.observe(el));
}

/* ---------- savol-javob akkordeoni ---------- */

function initAccordion() {
  document
    .querySelectorAll(".ac__q")
    .forEach((q) => {
      q.addEventListener("click", () => {
        const open =
          q.getAttribute("aria-expanded") === "true";

        q.setAttribute(
          "aria-expanded",
          open ? "false" : "true"
        );
      });
    });
}

/* ---------- magnit tugma (faqat sichqoncha va animatsiya yoqilganda) ---------- */

function initMagnetic() {
  if (
    reduceMotion ||
    !window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
  ) {
    return;
  }

  document
    .querySelectorAll(
      ".hero__cta .btn, .apply .btn--pop"
    )
    .forEach((btn) => {
      let raf = null;

      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();

        const dx =
          (e.clientX -
            (r.left + r.width / 2)) *
          0.22;

        const dy =
          (e.clientY -
            (r.top + r.height / 2)) *
          0.35;

        if (raf) {
          cancelAnimationFrame(raf);
        }

        raf = requestAnimationFrame(() => {
          btn.style.translate =
            `${dx}px ${dy}px`;
        });
      });

      btn.addEventListener("pointerleave", () => {
        if (raf) {
          cancelAnimationFrame(raf);
        }

        btn.style.translate = "";
      });
    });
}

/* ============================================================
   Kasting anketasi — koʻp qadamli forma
   ============================================================ */

/* Nomzod surati: brauzerda kichik JPEG ga siqib, yashirin maydonga data URL
   sifatida qoʻyamiz — JSON yengil qoladi (~100–200 KB). */
function initPhoto() {
  const input = document.getElementById("f-photo");
  const drop = document.getElementById("photoDrop");
  const img = document.getElementById("photoPreview");
  const ph = document.getElementById("photoPh");
  const dataEl = document.getElementById("photoData");
  const typeEl = document.getElementById("photoType");
  if (!input || !dataEl) return;

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    compressImage(file, 1000, 0.82)
      .then((dataUrl) => {
        dataEl.value = dataUrl;
        if (typeEl) typeEl.value = "image/jpeg";
        if (img) { img.src = dataUrl; img.hidden = false; }
        if (ph) ph.hidden = true;
        if (drop) drop.classList.add("is-set");
        dataEl.closest(".field")?.classList.remove("has-err");
        const err = dataEl.closest(".field")?.querySelector(".field__err");
        if (err) err.hidden = true;
      })
      .catch(() => { dataEl.value = ""; }); // tekshiruv suratni soʻraydi
  });
}

/* Rasmni kichraytirib JPEG data URL ga aylantiradi (uzun tomoni ≤ maxDim). */
function compressImage(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxDim / Math.max(image.naturalWidth, image.naturalHeight));
      const w = Math.max(1, Math.round(image.naturalWidth * scale));
      const h = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(image, 0, 0, w, h);
      try { resolve(canvas.toDataURL("image/jpeg", quality)); }
      catch (e) { reject(e); }
    };
    image.onerror = reject;
    image.src = url;
  });
}

function initForm() {
  const form = document.getElementById("castingForm");
  if (!form) return;

  const panels = [...form.querySelectorAll(".wiz-panel")];
  const steps = [...document.querySelectorAll(".wiz-steps__item")];
  const barFill = document.getElementById("wizBarFill");
  const backBtn = document.getElementById("wizBack");
  const nextBtn = document.getElementById("wizNext");
  const submitBtn = document.getElementById("submitBtn");
  const curEl = document.getElementById("wizCur");
  const errBar = document.getElementById("wizErr");
  const total = panels.length;
  let current = 0; // faol qadam (0 dan)
  let reached = 0; // yetib borilgan eng uzoq qadam (qadamlar orasida sakrash uchun)

  // Har bir telefon maydoniga +998 ni oldindan qoʻyamiz.
  form.querySelectorAll('input[type="tel"]').forEach((ph) => {
    ph.addEventListener("focus", () => {
      if (!ph.value.trim()) ph.value = "+998 ";
    });
  });

  // Foydalanuvchi tuzatishi bilan xatoni olib tashlaymiz.
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    const clear = () => {
      el.closest(".field")?.classList.remove("has-err");
      el.closest(".consent")?.classList.remove("has-err");
      const errNode = el.closest(".field")?.querySelector(".field__err");
      if (errNode) errNode.hidden = true;
      if (errBar) errBar.hidden = true;
    };
    el.addEventListener("input", clear);
    el.addEventListener("change", clear);
  });

  function show(i) {
    current = Math.max(0, Math.min(total - 1, i));
    reached = Math.max(reached, current);
    panels.forEach((p, idx) => p.classList.toggle("is-active", idx === current));
    steps.forEach((s, idx) => {
      s.classList.toggle("is-active", idx === current);
      s.classList.toggle("is-done", idx < current);
      s.classList.toggle("is-reached", idx <= reached);
    });
    if (barFill) barFill.style.transform = "scaleX(" + current / (total - 1) + ")";
    if (curEl) curEl.textContent = String(current + 1);
    if (backBtn) backBtn.hidden = current === 0;
    const last = current === total - 1;
    if (nextBtn) nextBtn.hidden = last;
    if (submitBtn) submitBtn.hidden = !last;
    if (errBar) errBar.hidden = true;
  }

  function validatePanel(panel) {
    const bad = [];
    panel.querySelectorAll("[required]").forEach((el) => {
      let ok = true;
      if (el.type === "checkbox") {
        ok = el.checked;
      } else if (el.type === "email") {
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      } else if (el.type === "number") {
        const n = Number(el.value);
        const min = el.min !== "" ? Number(el.min) : -Infinity;
        const max = el.max !== "" ? Number(el.max) : Infinity;
        ok = el.value !== "" && Number.isFinite(n) && n >= min && n <= max;
      } else if (el.type === "tel") {
        ok = el.value.replace(/\D/g, "").length >= 9;
      } else {
        ok = el.value.trim() !== "";
      }
      if (!ok) {
        bad.push(el);
        el.closest(".field")?.classList.add("has-err");
        el.closest(".consent")?.classList.add("has-err");
        const errNode = el.closest(".field")?.querySelector(".field__err");
        if (errNode) errNode.hidden = false;
      }
    });
    return bad;
  }

  function scrollToForm() {
    form.closest(".card")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function goNext() {
    const bad = validatePanel(panels[current]);
    if (bad.length) {
      if (errBar) errBar.hidden = false;
      bad[0].focus({ preventScroll: true });
      bad[0]
        .closest(".field, .consent")
        ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      return;
    }
    show(current + 1);
    scrollToForm();
  }

  nextBtn?.addEventListener("click", goNext);
  backBtn?.addEventListener("click", () => {
    show(current - 1);
    scrollToForm();
  });

  // Qadam nuqtalari: yetib borilgan istalgan qadamga oʻtish mumkin.
  steps.forEach((s, idx) => {
    s.addEventListener("click", () => {
      if (idx <= reached) {
        show(idx);
        scrollToForm();
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Barcha panellarni tekshiramiz; birinchi xatoliga oʻtamiz.
    for (let i = 0; i < total; i++) {
      const bad = validatePanel(panels[i]);
      if (bad.length) {
        show(i);
        if (errBar) errBar.hidden = false;
        bad[0].focus({ preventScroll: true });
        scrollToForm();
        return;
      }
    }

    const lang = getLang();
    const data = collectData(form, lang);

    submitBtn.classList.add("is-loading");
    submitBtn.querySelector(".btn__label").textContent = DICT[lang].submit_loading;

    try {
      await submitCasting(data);
      clearSubmissionId(); // keyingi toʻldirish — yangi ariza
      showSuccess();
    } catch (err) {
      console.error("[UPOP] submit failed:", err);
      submitBtn.classList.remove("is-loading");
      submitBtn.querySelector(".btn__label").textContent = DICT[lang].submit;
      alert(
        "Xatolik yuz berdi. Qayta urinib koʻring / Произошла ошибка. Попробуйте ещё раз / Something went wrong, please try again."
      );
    }
  });

  show(0);
}

/* Barcha nomli maydonlarni (checkbox lar va meta bilan) bitta obyektga yigʻadi. */
function collectData(form, lang) {
  const data = {};
  new FormData(form).forEach((v, k) => {
    data[k] = typeof v === "string" ? v.trim() : v;
  });
  form.querySelectorAll('input[type="checkbox"]').forEach((c) => {
    data[c.name] = c.checked;
  });
  data.lang = lang;
  data.submittedAt = new Date().toISOString();
  data.submissionId = getSubmissionId();
  return data;
}


function showSuccess() {
  const wrap =
    document.getElementById(
      "formwrap"
    );

  const ok =
    document.getElementById(
      "success"
    );

  if (wrap) {
    wrap.hidden = true;
  }

  if (ok) {
    ok.hidden = false;

    ok.scrollIntoView({
      behavior:
        reduceMotion
          ? "auto"
          : "smooth",
      block: "center",
    });
  }
}

/* ------------------------------------------------------------
   Bitta arizani SHEET_ENDPOINT dagi Apps Script orqali Google Sheets ga yuboradi.

   • Transport: text/plain POST — "oddiy" CORS soʻrovi (preflight yoʻq, Apps
     Script unga javob bera olmaydi), no-cors rejimida. Yozuv serverda saqlanadi;
     javob oʻqilmasa ham yetkazilgani aniq, faqat haqiqiy tarmoq xatosida rad
     etiladi — shunda foydalanuvchi qayta urinishi mumkin.
   • Takrorlanmaslik: payload da submissionId bor, Apps Script shu boʻyicha
     tekshiradi — qayta yuborish takror qator yaratmaydi.
   • Navbat: Apps Script yozishlarni qulf bilan tartibga soladi.

   SHEET_ENDPOINT boʻsh boʻlsa forma ishlayveradi, lekin hech narsa saqlanmaydi —
   google-apps-script/SETUP.md boʻyicha sozlang.
   ------------------------------------------------------------ */
async function submitCasting(data) {
  if (!SHEET_ENDPOINT) {
    console.warn(
      "[UPOP] SHEET_ENDPOINT is not set — the application was NOT saved. " +
        "See google-apps-script/SETUP.md to connect the UPOP_casting sheet."
    );
    console.log("[UPOP] casting application (not saved):", data);
    return new Promise((resolve) => setTimeout(resolve, 700));
  }

  const body = JSON.stringify(data);
  const req = () => ({
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // oddiy soʻrov → preflight yoʻq
    body,
    redirect: "follow",
  });

  // 1) Oʻqiladigan urinish: "Anyone" uchun joylangan Apps Script
  //    Access-Control-Allow-Origin:* qaytaradi — id ni tozalashdan oldin
  //    yozuv haqiqatan saqlanganini ({ok:true}) tekshirib olamiz.
  let res;
  try {
    res = await fetch(SHEET_ENDPOINT, req());
  } catch (_networkOrCors) {
    // Javobni oʻqib boʻlmadi (CORS yopdi yoki tarmoq uzildi). Soʻrov yetib borgan
    // boʻlishi mumkin, lekin ishonch uchun opaque rejimda qayta yuboramiz —
    // serverdagi submissionId tekshiruvi ikkinchi qator yaratilishiga yoʻl qoʻymaydi.
    // Bu ham oʻtmasa, demak haqiqatan oflayn: xato yuqoriga uzatiladi (id saqlanadi).
    await fetch(SHEET_ENDPOINT, { ...req(), mode: "no-cors" });
    return;
  }

  // Javob oʻqildi — serverning hukmiga ishonamiz.
  let payload = null;
  try { payload = await res.json(); } catch (_) {}
  if (!res.ok || (payload && payload.ok === false)) {
    throw new Error((payload && payload.error) || "HTTP " + res.status);
  }
}

/* ---------- yordamchi ---------- */

