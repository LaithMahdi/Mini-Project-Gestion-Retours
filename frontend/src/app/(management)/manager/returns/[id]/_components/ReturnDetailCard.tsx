import { Card } from "@/components/ui/card";
import { Item } from "../../_components/types";
import { formatDate } from "@/lib/utils";

interface Props {
  item: Item;
  statusInfo: {
    label: string;
    className: string;
  };
}
const ReturnDetailCard = (props: Props) => {
  const { item, statusInfo } = props;
  return (
    <Card className="shadow-lg dark:shadow-black/30">
      <div className="p-8">
        <div className="mb-8 flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
            État:
          </span>
          <span
            className={`${statusInfo.className} px-4 py-2 rounded-full border text-sm font-semibold`}
          >
            {statusInfo.label}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                Client
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {item.client}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                Produit
              </h3>
              <p className="text-lg text-gray-900 dark:text-slate-100 font-medium">
                {item.produit}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                Date du Retour
              </h3>
              <p className="text-lg text-gray-900 dark:text-slate-100">
                {formatDate(item.date)}
              </p>
            </div>
          </div>

          <div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                Raison du Retour
              </h3>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700">
                <p className="text-gray-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {item.raison}
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-200 dark:border-slate-700" />

        <div className="text-xs text-gray-500 dark:text-slate-400 flex justify-between items-center">
          <span>ID du retour: {item.id}</span>
          <span>Dernière mise à jour: {formatDate(item.date)}</span>
        </div>
      </div>
    </Card>
  );
};

export default ReturnDetailCard;
