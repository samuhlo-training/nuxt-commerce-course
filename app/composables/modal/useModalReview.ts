import type { ProductReview } from "../../../prisma/generated/prisma/browser";

export const useModalReview = () => {
  const toast = useToast();
  const isOpen = ref(false);
  const reviewText = ref("");
  const userTitle = ref("");
  const rating = ref(0);

  const resetForm = () => {
    reviewText.value = "";
    rating.value = 0;
    userTitle.value = "";
  };

  const handleModalClose = (value: boolean) => {
    isOpen.value = value;
    if (!value) {
      resetForm();
    }
  };

  const submitReview = async (slug: string): Promise<ProductReview | null> => {
    try {
      const review = await $fetch<ProductReview>(
        `/api/product/${slug}/review`,
        {
          method: "POST",
          body: {
            rating: rating.value,
            review: reviewText.value,
            userTitle: userTitle.value,
          },
        },
      );

      toast.add({
        title: "Reseña enviada",
        description: "Gracias por tu reseña",
        color: "success",
        icon: "i-lucide-check-circle",
      });

      isOpen.value = false;
      resetForm();
      return review;
    } catch (error) {
      toast.add({
        title: "Error al enviar reseña",
        description:
          error instanceof Error ? error.message : "Error al enviar reseña",
        color: "error",
        icon: "i-lucide-x-circle",
      });
      return null;
    }
  };

  return {
    isOpen,
    reviewText,
    userTitle,
    rating,
    handleModalClose,
    submitReview,
  };
};
