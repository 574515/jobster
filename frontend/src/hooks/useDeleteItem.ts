import {useCallback, useEffect, useState} from "react";

import homeScreenAtom from "../atoms/homeScreenAtom.ts";
import loadingAtom from "../atoms/loadingAtom.ts";
import i18n from 'i18next';

import {useRecoilValue, useSetRecoilState} from "recoil";
import {constantItemName} from "../helpers/constants.ts";
import {toast} from "../helpers/customToast.ts";
import {DeleteItemHookProps} from "../models/interfaces.ts";
import {DeleteItemType} from "../models/types.ts";

const useDeleteItem = (
	{item, deleteAction, getAllItems}: DeleteItemHookProps
) => {
	const homeScreenState = useRecoilValue<string>(homeScreenAtom);
	const setIsLoading = useSetRecoilState<boolean>(loadingAtom);
	const [itemName, setItemName] = useState<string>();

	useEffect(() => setItemName(constantItemName[homeScreenState]), [homeScreenState]);

	const handleDelete = useCallback(
		async () => {
			if (!item) return;
			setIsLoading(true);
			await deleteAction(item._id)
				.then((response: DeleteItemType) => {
					void toast(`${itemName} "${response.deletedProperty}" ${i18n.t("validators.DeletedSuccessfully")}`, 'success');
					getAllItems();
				})
				.catch((error) => void toast(error.response.data.error, 'error'))
				.finally(() => setIsLoading(false));
		}, [item, setIsLoading, deleteAction, itemName, getAllItems]);

	return {handleDelete};
};

export default useDeleteItem;
