import React, { useMemo, useState } from "react";
import { Button } from "@strapi/design-system";
import { Trash } from "@strapi/icons";
import {
  useCMEditViewDataManager,
  useFetchClient,
  useNotification,
} from "@strapi/helper-plugin";
import { useHistory } from "react-router-dom";

const DeleteAllLocalesButton = () => {
  const { del } = useFetchClient();
  const toggleNotification = useNotification();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { initialData, isSingleType, slug } = useCMEditViewDataManager();

  const localizedEntryIds = useMemo(() => {
    const currentId = initialData?.id;
    const localizationIds = (initialData?.localizations ?? [])
      .map((entry) => entry?.id)
      .filter(Boolean);

    const uniqueIds = [
      ...new Set([currentId, ...localizationIds].filter(Boolean)),
    ];

    // Delete other locales first, then the entry being edited (last).
    return [
      ...uniqueIds.filter((id) => id !== currentId),
      ...(currentId ? [currentId] : []),
    ];
  }, [initialData]);

  if (isSingleType || localizedEntryIds.length === 0) {
    return null;
  }

  const handleDeleteAllLocales = async () => {
    const confirmed = window.confirm(
      `Delete this entry in all locales (${localizedEntryIds.length})? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setIsLoading(true);

    try {
      for (const entryId of localizedEntryIds) {
        const { status } = await del(
          `/content-manager/collection-types/${slug}/${entryId}`
        );

        if (status < 200 || status >= 300) {
          throw new Error(`Delete failed for entry ${entryId}`);
        }
      }

      toggleNotification({
        type: "success",
        message: {
          id: "delete-all-locales.success",
          defaultMessage: "All locales deleted",
        },
      });

      history.push(`/content-manager/collectionType/${slug}`);
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: {
          id: "delete-all-locales.error",
          defaultMessage: "Unable to delete all localized entries",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="danger-light"
      startIcon={<Trash />}
      onClick={handleDeleteAllLocales}
      loading={isLoading}
      disabled={isLoading}
    >
      Delete all locales
    </Button>
  );
};

export default {
  config: {},
  bootstrap(app) {
    app.injectContentManagerComponent("editView", "right-links", {
      name: "delete-all-locales-button",
      Component: DeleteAllLocalesButton,
    });
  },
};
