import ProfileInfoItem from "./ProfileInfoItem";
import { getDisplayValue } from "@/utils/display.utils";

export type ProfileInfoField<TValues> =
  | {
      key: keyof TValues;
      label: string;
    }
  | {
      key: string;
      label: string;
      getValue: (values: TValues) => unknown;
    };

type ProfileInfoListProps<TValues> = {
  items: ProfileInfoField<TValues>[];
  values: TValues;
  formatValue?: (key: string, value: unknown, values: TValues) => string;
};

const getFieldValue = <TValues extends object>(
  field: ProfileInfoField<TValues>,
  values: TValues,
) => ("getValue" in field ? field.getValue(values) : values[field.key]);

export default function ProfileInfoList<TValues extends object>({
  items,
  values,
  formatValue,
}: ProfileInfoListProps<TValues>) {
  return (
    <>
      {items.map((field) => {
        const value = getFieldValue(field, values);

        return (
          <ProfileInfoItem
            key={String(field.key)}
            label={field.label}
            value={
              formatValue
                ? formatValue(String(field.key), value, values)
                : getDisplayValue(value)
            }
          />
        );
      })}
    </>
  );
}
