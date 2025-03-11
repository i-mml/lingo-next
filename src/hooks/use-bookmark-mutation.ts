import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostAuthBookmarks } from "@/api/services/auth";

const useBookMarkMutation = ({ queryKey }: { queryKey: string | any }) => {
  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: async ({ movieId }: { movieId: number }) => {
      await PostAuthBookmarks(movieId);
    },
    onMutate: async ({ movieId }) => {
      await queryClient.cancelQueries({ queryKey });

      queryClient.setQueryData(queryKey, (oldCategories: any) => {
        const changed = oldCategories.data?.map((category: any) => {
          return {
            ...category,
            movies: category.movies?.map((movie: any) =>
              movie.id === movieId
                ? { ...movie, is_bookmarked: !movie?.is_bookmarked }
                : movie
            ),
          };
        });

        return { data: changed };
      });
    },
    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData(queryKey, context?.previousCategories);
    },
  });

  return bookmarkMutation;
};

export default useBookMarkMutation;
