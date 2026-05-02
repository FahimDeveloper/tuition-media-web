import ProfileInfoItem from "./ProfileInfoItem";
import { getDisplayValue } from "../profileUtils";

export type ProfileInfoField<TValues> = {
  key: keyof TValues;
  label: string;
};

type ProfileInfoListProps<TValues> = {
  items: ProfileInfoField<TValues>[];
  values: TValues;
  formatValue?: (
    key: keyof TValues,
    value: TValues[keyof TValues],
    values: TValues,
  ) => string;
};

export default function ProfileInfoList<TValues extends object>({
  items,
  values,
  formatValue,
}: ProfileInfoListProps<TValues>) {
  return (
    <>
      {items.map(({ key, label }) => (
        <ProfileInfoItem
          key={String(key)}
          label={label}
          value={
            formatValue
              ? formatValue(key, values[key], values)
              : getDisplayValue(values[key])
          }
        />
      ))}
    </>
  );
}
