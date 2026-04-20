import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  error: unknown;
}

const ReturnDetailError = (props: Props) => {
  const { error } = props;
  const router = useRouter();

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-red-50 dark:bg-rose-900/10 border border-red-200 dark:border-rose-800 rounded-lg p-6 text-center">
          <p className="text-red-800 dark:text-rose-200 mb-4">
            {error instanceof Error ? error.message : "Retour non trouvé"}
          </p>
          <Button onClick={() => router.push("/manager/returns")}>
            Retour aux retours
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReturnDetailError;
