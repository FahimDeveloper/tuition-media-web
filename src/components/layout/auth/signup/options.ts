import type { AuthGender } from "@/redux/features/auth/auth.types";

export const GENDER_OPTIONS: { label: string; value: AuthGender }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

type SelectOption<T extends string> = {
  label: T;
  value: T;
};

const CITY_LOCATION_MAP = {
  Dhaka: [
    "Dhanmondi",
    "Gulshan",
    "Banani",
    "Mirpur",
    "Uttara",
    "Mohammadpur",
    "Badda",
    "Bashundhara",
    "Motijheel",
    "Jatrabari",
  ],
  Chattogram: [
    "Agrabad",
    "Panchlaish",
    "Khulshi",
    "Halishahar",
    "Patenga",
    "Chandgaon",
    "Nasirabad",
    "Kotwali",
  ],
  Khulna: [
    "Sonadanga",
    "Khalishpur",
    "Daulatpur",
    "Khulna Sadar",
    "Boyra",
    "Rupsha",
  ],
  Rajshahi: [
    "Boalia",
    "Motihar",
    "Rajpara",
    "Shah Makhdum",
    "Paba",
    "Katakhali",
  ],
  Barishal: [
    "Barishal Sadar",
    "Rupatali",
    "Sadar Road",
    "Band Road",
    "Kashipur",
    "C and B Road",
  ],
  Sylhet: [
    "Zindabazar",
    "Amberkhana",
    "Shahjalal Upashahar",
    "Subhanighat",
    "Kumarpara",
    "South Surma",
  ],
  Rangpur: [
    "Rangpur Sadar",
    "Dhap",
    "Jahaj Company More",
    "Modern More",
    "Pairaband",
    "Cantonment",
  ],
  Mymensingh: [
    "Mymensingh Sadar",
    "Charpara",
    "Maskanda",
    "Ganginarpar",
    "Shambhuganj",
    "Town Hall More",
  ],
  Gazipur: [
    "Tongi",
    "Board Bazar",
    "Gazipur Sadar",
    "Konabari",
    "Joydebpur",
    "Pubail",
  ],
  Narayanganj: [
    "Chashara",
    "Fatullah",
    "Siddhirganj",
    "Bandar",
    "Narayanganj Sadar",
    "Shibu Market",
  ],
  Cumilla: [
    "Cumilla Sadar",
    "Kandirpar",
    "Tomchom Bridge",
    "Kotbari",
    "Jhawtola",
    "EPZ",
  ],
  Bogura: [
    "Bogura Sadar",
    "Satmatha",
    "Sherpur Road",
    "Thanthania",
    "Seujgari",
    "Nawdapara",
  ],
} as const;

type CityName = keyof typeof CITY_LOCATION_MAP;
type LocationName<TCity extends CityName = CityName> =
  (typeof CITY_LOCATION_MAP)[TCity][number];
type CityOption = SelectOption<CityName>;
type LocationOption = SelectOption<LocationName>;

export const SIGNUP_CITY_OPTIONS: CityOption[] = (
  Object.keys(CITY_LOCATION_MAP) as CityName[]
).map((city) => ({
  label: city,
  value: city,
}));

export const isCityName = (value: unknown): value is CityName =>
  typeof value === "string" && value in CITY_LOCATION_MAP;

export const isLocationForCity = (
  city: CityName,
  location: unknown,
): location is LocationName => {
  if (typeof location !== "string") {
    return false;
  }

  return (CITY_LOCATION_MAP[city] as readonly string[]).includes(location);
};

export const getLocationOptionsForCity = (
  city?: CityName,
): LocationOption[] => {
  if (!city) {
    return [];
  }

  return CITY_LOCATION_MAP[city].map((location) => ({
    label: location,
    value: location,
  }));
};
