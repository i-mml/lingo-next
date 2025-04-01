"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "next-themes";
import WaveLoading from "@/components/shared/WaveLoading";
import { useMutation, useQuery } from "@tanstack/react-query";
import BackIconComponent from "@/components/shared/BackIconComponent";
import {
  GetEducationQuiz,
  PostEducationQuizResult,
} from "@/api/services/education";
import AskBeforeReloadPage from "./components/AskBeforeReloadPage";
import QuizTypeCard from "./components/QuizTypeCard";
import clipboard_lineal from "@/assets/lotties/clipboard_lineal.json";
import flashcard_lineal from "@/assets/lotties/flashcard_lineal.json";
import grammar_quiz_lineal from "@/assets/lotties/grammar-quiz-lineal.json";
import SelectMovieModal from "./components/SelectMovieModal";
import SelectGrammarModal from "./components/SelectGrammarModal";
import SuccessCheckedIcon from "@/assets/success-checked.svg";
import QuizReadyBox from "./components/QuizReadyBox";
import QuizBox from "./components/QuizBox";
import QuizEmptyBox from "./components/QuizEmptyBox";
import QuizFinishedBox from "./components/QuizFinishedBox";

const QuizView = () => {
  const { whoAmI } = useAuth();
  const { theme } = useTheme();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentQuestions, setCurrentQuestion] = useState(0);
  const [selectMovieModal, setSelectMovieModal] = useState(false);
  const [selectGrammarModal, setSelectGrammarModal] = useState(false);
  const [quizType, setQuizType] = useState<
    "FLASHCARD" | "MOVIE" | "GRAMMAR" | "LESSON_WORDS" | ""
  >("");
  const [step, setStep] = useState<"READY" | "DOING" | "FINISHED">("READY");
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>();

  const videoId = params.videoId as string;
  const episodeId = params.episodeId as string;
  const hasGrammarParams = searchParams.get("iGrammarQuiz");
  const hasVocabulary = searchParams.get("isVocabulary");

  const answeredArray = useRef<any>([]);

  const queryParams = !!hasGrammarParams
    ? `?grammar_category_id=${selectedMovieId}`
    : !!hasVocabulary
    ? `?lesson_word_id=${selectedMovieId}`
    : quizType === "MOVIE"
    ? `?episode_id=${selectedMovieId}`
    : "";

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-quiz-list", selectedMovieId],
    queryFn: () =>
      GetEducationQuiz(queryParams).then((res) => {
        setStep("READY");
        return res;
      }),
    enabled: quizType !== "" || !!selectedMovieId,
  });
  const questions = data?.data?.quiz?.questions;

  const currentQuestionData = useMemo(
    () =>
      questions?.find(
        (node: any, index: number) => node?.id && index + 1 === currentQuestions
      ),
    [currentQuestions, questions]
  );

  const toggleSelectMovie = () => setSelectMovieModal((prev) => !prev);
  const toggleSelectGrammar = useCallback(
    () => setSelectGrammarModal((prev) => !prev),
    []
  );

  const handleStartQuiz = () => {
    setStep("DOING");
    setCurrentQuestion(1);
  };

  const postQuizResultMutation = useMutation({
    mutationFn: (body: any) =>
      PostEducationQuizResult(body).then((res) => {
        setStep("FINISHED");
        return res.data;
      }),
  });

  const handleSendResult = async () => {
    const body = {
      quiz: data?.data?.quiz?.id,
      questions: answeredArray?.current,
    };
    postQuizResultMutation.mutateAsync(body);
  };

  const handleMoveNextQuestion = (
    question: any,
    isRight: boolean,
    selected_option: any
  ) => {
    const correctOption = question?.options?.find(
      (node: { id: number; text: string; is_answer: boolean }) => node.is_answer
    );

    answeredArray.current = [
      ...answeredArray.current,
      {
        id: question?.id,
        text: question?.text,
        is_correct: isRight,
        selected_option,
        correct_option: correctOption?.id,
      },
    ];
    if (currentQuestions < questions?.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSendResult();
    }
  };

  const restartQuiz = () => {
    answeredArray.current = [];
    setCurrentQuestion(0);
    refetch();
  };

  const emptyBoxClickHandler = () => {
    setQuizType("");
    if (quizType !== "FLASHCARD") {
      setSelectedMovieId(null);
    }
  };

  const handleOnChange = (_: any, newValue: any) => {
    if (newValue && typeof newValue.id === "number") {
      setSelectedMovieId(newValue?.id);
      setQuizType("MOVIE");
    }
  };
  const handleSelectGrammar = (categoryId: number) => {
    setSelectedMovieId(categoryId);
    setQuizType("GRAMMAR");
  };

  useEffect(() => {
    if (videoId && episodeId) {
      setQuizType("MOVIE");
      setSelectedMovieId(+episodeId);
    }
    if (
      videoId &&
      episodeId &&
      hasGrammarParams &&
      whoAmI?.userpreference?.preferred_language === 2
    ) {
      setQuizType("GRAMMAR");
      setSelectedMovieId(+videoId);
    }
    if (
      videoId &&
      episodeId &&
      hasVocabulary &&
      whoAmI?.userpreference?.preferred_language === 2
    ) {
      setQuizType("LESSON_WORDS");
      setSelectedMovieId(+videoId);
    }
  }, [
    episodeId,
    hasGrammarParams,
    hasVocabulary,
    videoId,
    whoAmI?.userpreference?.preferred_language,
  ]);

  return (
    <section className="bg-background-layout p-6 min-h-[calc(100vh-110px)] px-[5%]">
      <AskBeforeReloadPage />
      <BackIconComponent
        className=""
        clickHandler={
          step === "READY"
            ? () =>
                router.push(
                  quizType === "LESSON_WORDS"
                    ? `/public/vocabulary`
                    : quizType === "GRAMMAR"
                    ? "/public/grammar-list"
                    : "/public/catalog"
                )
            : () => {
                setStep("READY");
                setQuizType("");
              }
        }
      />
      {quizType === "" ? (
        <div className="min-h-[60vh] flex items-center justify-center flex-col">
          <h2 className="text-lg md:text-2xl text-main font-semibold text-center pt-5 lg:pt-0">
            برای شروع کوئیز، ابتدا مشخص کنید شامل چه محتوایی باشد
          </h2>
          <div className="flex items-center justify-center gap-6 lg:gap-16 mt-12 flex-col lg:flex-row w-full">
            <QuizTypeCard
              lottieFile={flashcard_lineal}
              onClick={() => setQuizType("FLASHCARD")}
              title="کوئیز از فلش کارت‌ها"
            />
            <QuizTypeCard
              lottieFile={clipboard_lineal}
              onClick={() => toggleSelectMovie()}
              title="کوئیز از فیلم‌ها"
            />
            {whoAmI?.userpreference?.preferred_language === 2 && (
              <QuizTypeCard
                lottieFile={grammar_quiz_lineal}
                onClick={() => toggleSelectGrammar()}
                title="کوئیز از گرامر"
              />
            )}
          </div>
          {selectMovieModal && (
            <SelectMovieModal
              handleOnChange={handleOnChange}
              selectMovieModal={selectMovieModal}
              toggleSelectMovie={toggleSelectMovie}
            />
          )}
          {selectGrammarModal && (
            <SelectGrammarModal
              handleSelectGrammar={handleSelectGrammar}
              selectGrammarModal={selectGrammarModal}
              toggleSelectGrammar={toggleSelectGrammar}
            />
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-full border border-border-main bg-background-main rounded-lg p-2 flex items-center gap-3">
              <div className="w-full bg-gray-800 h-2 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                  style={{
                    width: `${(currentQuestions / questions?.length) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-gray-200 font-semibold">{`${currentQuestions}/${questions?.length}`}</span>
            </div>
            <div className="flex items-center gap-1.5 border border-border-main bg-background-main rounded-lg p-2 text-text-main">
              <SuccessCheckedIcon className="w-5 h-5" />
              {
                answeredArray.current?.filter((item: any) => item?.is_correct)
                  ?.length
              }
            </div>
          </div>

          {!questions?.length ? (
            <div className="bg-background-main p-6 rounded-xl shadow-lg">
              <QuizEmptyBox
                clickAction={emptyBoxClickHandler}
                quizType={quizType}
              />
            </div>
          ) : (
            <div className="bg-background-main p-6 rounded-xl shadow-lg">
              {step === "READY" && (
                <QuizReadyBox handleStartQuiz={handleStartQuiz} />
              )}
              {step === "DOING" && (
                <QuizBox
                  handleMovieNextQuestion={handleMoveNextQuestion}
                  currentQuestion={currentQuestions}
                  question={currentQuestionData}
                  isLast={currentQuestions === questions?.length}
                  disabled={isLoading || postQuizResultMutation?.isPending}
                />
              )}
              {step === "FINISHED" &&
                (postQuizResultMutation.isPending ? (
                  <WaveLoading isBlack={theme === "dark"} />
                ) : (
                  <QuizFinishedBox
                    answeredQuiz={
                      postQuizResultMutation.data?.data?.quiz_result?.questions
                    }
                    quizResult={postQuizResultMutation.data?.data}
                    handleReStartQuiz={restartQuiz}
                  />
                ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default QuizView;
