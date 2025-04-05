import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import ViewCarouselOutlinedIcon from "@mui/icons-material/ViewCarouselOutlined";
import React from "react";
import AnswerItem from "./components/AnswerItem";
import HeroItem from "./components/HeroItem";

const HowToUseView = () => {
  return (
    <div className="px-[5%] py-12">
      <header className="pb-6 lg:pb-12 text-center">
        <h1 className="text-2xl lg:text-4xl font-bold text-main mb-4">
          یادگیری زبان با محتوای تصویری و صوتی
        </h1>
        <p className="text-[16px] lg:text-lg text-gray400 max-w-3xl mx-auto">
          یادگیری زبان انگلیسی را با ویدیوهای تعاملی، فلش‌کارت‌های هوشمند و
          آزمون‌های جذاب به‌صورت مؤثر و هیجان‌انگیز بیاموزید.
        </p>
      </header>
      <div className="grid grid-cols-3 gap-1 lg:gap-8 mb-6 lg:mb-16 -mx-[4%]">
        <HeroItem
          title="یادگیری با فیلم"
          description="تماشا محتوا با دو زیرنویس انگلیسی و فارسی"
          icon={
            <PlayCircleFilledOutlinedIcon className="!text-3xl lg:!text-4xl text-primary" />
          }
        />
        <HeroItem
          title="ساخت فلش کارت"
          description="ساخت فلش‌کارت‌های اختصاصی از زیرنویس‌‌ها"
          icon={
            <ViewCarouselOutlinedIcon className="!text-3xl lg:!text-4xl text-primary" />
          }
        />
        <HeroItem
          title="تمرین و کوئیز"
          description="کوئیز از هربخش فیلم یا از فلش‌کارت های اختصاصی شما"
          icon={
            <HelpOutlinedIcon className="!text-3xl lg:!text-4xl text-primary" />
          }
        />
      </div>
      <section className="mb-16">
        <h2 className="text-2xl lg:text-3xl  font-bold text-center mb-7 lg:mb-12 text-main">
          چجوری ویدیو ببینم؟
        </h2>{" "}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              alt="word detail"
              src="/images/word-detail.jpg"
              className="w-full rounded-lg max-w-[320px] lg:max-w-[400px]"
            />
            <img
              alt="video player"
              src="/images/player-view.jpg"
              className="w-full rounded-lg max-w-[320px] lg:max-w-[400px]"
            />
          </div>
          <div className="space-y-6">
            <AnswerItem
              num={1}
              title="یک محتوا (فیلم-انیمیشن-موسیقی) رو انتخاب کنید"
              description="لیست محتواها را ببینید و محتوایی را انتخاب کنید که با سطح یادگیری شما مطابقت دارد."
            />
            <AnswerItem
              num={2}
              title="گوش بده، تکرار کن،اجزا و گرامر جمله رو ببین"
              description="هنگام تماشای محتوا اون دیالوگی که دوست دارید رو تکرار کنید و درصد تشابه به جمله رو متوجه بشید و اجزا جمله و گرامر جمله و تکرار دوباره جمله هم در اختیار شما قرار گرفته."
            />
            <AnswerItem
              num={3}
              title="تمام اطلاعات یک کلمه رو ببین"
              description="با کلیک بر روی هر کلمه انگلیسی از زیرنویس معنی فارسی، انگلیسی ، اطلاعات دیکشنری های لانگ‌من و کالینز رو ببینید."
            />
            <AnswerItem
              num={4}
              title="اتمام فیلم و کوئیز"
              description="بعد از اتمام هر بخش، کوئیز همون بخش رو بدید تا ببینید چقدرش رو یاد گرفتید. (مثلا هری‌پاتر1 بخش دوم)"
            />
          </div>
        </div>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl lg:text-3xl font-bold text-center mb-7 lg:mb-12 text-main">
          ساخت فلش‌کارت‌های اختصاصی
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="space-y-6  order-2 lg:order-1">
            <AnswerItem
              num={1}
              title="روی زیرنویس کلیک کنید"
              description="با کلیک بر روی هر کلمه انگلیسی، یک مدال باز میشه که قابلیت تکرار تلفظ کلمه و افزودن به فلش کارت مهیا میشه"
            />
            <AnswerItem
              num={2}
              title="فلش کارت بسازید و مرور کنید"
              description="برای مرور فلش‌کارت‌هات ، وارد صفحه فلش‌کارت شو و لیست کامل فلش‌کارت‌های اختصاصیت رو ببین و مرور کنید"
            />
            <AnswerItem
              num={3}
              title="فلش‌کارت‌های تصویری و صوتی"
              description="زبانو فقط فلش‌کارت معمولی به شما ارائه نمیده، بلکه اون فلش‌کارت از همون سکانس فیلم-موسیقی ساخته میشه که میخواید"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 order-1 lg:order-2">
            <img
              alt="word detail"
              src="/images/flashcards-slider.jpg"
              className="w-full rounded-lg max-w-[320px] lg:max-w-[400px]"
            />
            <img
              alt="video player"
              src="/images/flashcards-view.jpg"
              className="w-full rounded-lg max-w-[320px] lg:max-w-[400px]"
            />
          </div>
        </div>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl lg:text-3xl  font-bold text-center mb-7 lg:mb-12 text-main">
          کوئیز های متنوع و جذاب
        </h2>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <img
              alt="word detail"
              src="/images/quiz-view.jpg"
              className="w-full rounded-lg max-w-[320px] lg:max-w-[400px]"
            />
            <img
              alt="video player"
              src="/images/quiz-types.jpg"
              className="w-full rounded-lg max-w-[320px] lg:max-w-[400px]"
            />
          </div>
          <div className="space-y-6">
            <AnswerItem
              num={1}
              title="یکی از نوع های کوئیز رو انتخاب کنید"
              description="میتونید از فلش‌کارت‌های اختصاصیت، گرامرها یا هر فیلمی که مدنظرت کوئیز بدید"
            />
            <AnswerItem
              num={2}
              title="تکرار ویدیو سوال"
              description="عجله نکنید، و ویدیو سوال رو چندبار نگاه و گوش کنید تا خوب متوجه بشید"
            />
            <AnswerItem
              num={3}
              title="کوئییز بینهایت"
              description="از هر بخشی که تو عنوان اول قید کردیم، میتونی بینهایت کوئییز بدید و محدودیتی ندارید"
            />
          </div>
        </div>
      </section>
      <section className="mb-16">
        <h2 className="text-2xl lg:text-3xl  font-bold text-center mb-7 lg:mb-12 text-main">
          سوالات متداول
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-backgroundMain p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 text-main">
              آیا قبل از خرید اشتراک میتونیم به صورت رایگان تست کنیم؟
            </h3>
            <p className="text-gray400">
              بله، شما میتوانید از بخش {`"رایگان بیاموزید"`} زبانو استفاده کنید
              و محتواهای رایگان رو تست کنید.
            </p>
          </div>
          <div className="bg-backgroundMain p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 text-main">
              آیا محدودیتی در ساخت فلش‌کارت یا میزان استفاده از اپلیکیشن داریم؟
            </h3>
            <p className="text-gray400">
              خیر شما با خرید اشتراک میتونید بینهایت فلش‌کارت اختصاصی و بینهایت
              محتوا تماشا کنید{" "}
            </p>
          </div>
          <div className="bg-backgroundMain p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2 text-main">
              زبانو فقط زبان انگلیسی رو آموزش میده یا بقیه زبان ها هم جزوشن؟
            </h3>
            <p className="text-gray400">
              درحال حاضر فقط زبان انلگیسی رو داریم ، به زودی زبان آلمانی و
              اسپانیایی اضافه خواهند شد
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToUseView;
