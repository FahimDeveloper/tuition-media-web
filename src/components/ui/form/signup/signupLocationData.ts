type SelectOption<T extends string> = {
  label: T;
  value: T;
};

export const SIGNUP_CITY_LOCATION_MAP = {
  Dhaka: [
    'Dhanmondi',
    'Gulshan',
    'Banani',
    'Mirpur',
    'Uttara',
    'Mohammadpur',
    'Badda',
    'Bashundhara',
    'Motijheel',
    'Jatrabari',
  ],
  Chattogram: [
    'Agrabad',
    'Panchlaish',
    'Khulshi',
    'Halishahar',
    'Patenga',
    'Chandgaon',
    'Nasirabad',
    'Kotwali',
  ],
  Khulna: [
    'Sonadanga',
    'Khalishpur',
    'Daulatpur',
    'Khulna Sadar',
    'Boyra',
    'Rupsha',
  ],
  Rajshahi: [
    'Boalia',
    'Motihar',
    'Rajpara',
    'Shah Makhdum',
    'Paba',
    'Katakhali',
  ],
  Barishal: [
    'Barishal Sadar',
    'Rupatali',
    'Sadar Road',
    'Band Road',
    'Kashipur',
    'C and B Road',
  ],
  Sylhet: [
    'Zindabazar',
    'Amberkhana',
    'Shahjalal Upashahar',
    'Subhanighat',
    'Kumarpara',
    'South Surma',
  ],
  Rangpur: [
    'Rangpur Sadar',
    'Dhap',
    'Jahaj Company More',
    'Modern More',
    'Pairaband',
    'Cantonment',
  ],
  Mymensingh: [
    'Mymensingh Sadar',
    'Charpara',
    'Maskanda',
    'Ganginarpar',
    'Shambhuganj',
    'Town Hall More',
  ],
  Gazipur: [
    'Tongi',
    'Board Bazar',
    'Gazipur Sadar',
    'Konabari',
    'Joydebpur',
    'Pubail',
  ],
  Narayanganj: [
    'Chashara',
    'Fatullah',
    'Siddhirganj',
    'Bandar',
    'Narayanganj Sadar',
    'Shibu Market',
  ],
  Cumilla: [
    'Cumilla Sadar',
    'Kandirpar',
    'Tomchom Bridge',
    'Kotbari',
    'Jhawtola',
    'EPZ',
  ],
  Bogura: [
    'Bogura Sadar',
    'Satmatha',
    'Sherpur Road',
    'Thanthania',
    'Seujgari',
    'Nawdapara',
  ],
} as const;

export type CityName = keyof typeof SIGNUP_CITY_LOCATION_MAP;

export type LocationName<TCity extends CityName = CityName> =
  (typeof SIGNUP_CITY_LOCATION_MAP)[TCity][number];

export type CityOption = SelectOption<CityName>;
export type LocationOption = SelectOption<LocationName>;

const cityNames = Object.keys(SIGNUP_CITY_LOCATION_MAP) as CityName[];

export const SIGNUP_CITY_OPTIONS: CityOption[] = cityNames.map((city) => ({
  label: city,
  value: city,
}));

export const isCityName = (value: unknown): value is CityName =>
  typeof value === 'string' && value in SIGNUP_CITY_LOCATION_MAP;

export const getLocationOptionsForCity = (
  city?: CityName,
): LocationOption[] => {
  if (!city) {
    return [];
  }

  return SIGNUP_CITY_LOCATION_MAP[city].map((location) => ({
    label: location,
    value: location,
  }));
};

export const isLocationForCity = (
  city: CityName,
  location: unknown,
): location is LocationName => {
  if (typeof location !== 'string') {
    return false;
  }

  return (SIGNUP_CITY_LOCATION_MAP[city] as readonly string[]).includes(location);
};
