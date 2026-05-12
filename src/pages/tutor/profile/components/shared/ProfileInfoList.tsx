import ProfileInfoItem from "./ProfileInfoItem";
import { getDisplayValue } from "@/utils/display.utils";

export type ProfileInfoField<TValues> = {
  key: keyof TValues | string;
  label: string;
  getValue?: (values: TValues) => unknown;
};

type ProfileInfoListProps<TValues> = {
  items: ProfileInfoField<TValues>[];
  values: TValues;
  formatValue?: (key: keyof TValues, value: unknown, values: TValues) => string;
};

export default function ProfileInfoList<TValues extends object>({
  items,
  values,
  formatValue,
}: ProfileInfoListProps<TValues>) {
  return (
    <>
      {items.map(({ key, label, getValue }) => (
        <ProfileInfoItem
          key={String(key)}
          label={label}
          value={
            formatValue
              ? formatValue(
                  key as keyof TValues,
                  getValue ? getValue(values) : values[key as keyof TValues],
                  values,
                )
              : getDisplayValue(
                  getValue ? getValue(values) : values[key as keyof TValues],
                )
          }
        />
      ))}
    </>
  );
}
