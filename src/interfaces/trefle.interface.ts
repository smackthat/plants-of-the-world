/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Kingdom {
  id: number;
  name: string;
  slug: string;
  links: { self: string };
}

export interface Subkingdom {
  id: number;
  name: string;
  slug: string;
  kingdom: Kingdom;
  links: { self: string; kingdom: string };
}

export interface Division {
  id: number;
  name: string;
  slug: string;
  subkingdom: Subkingdom;
  links: { self: string; subkingdom: string };
}

export interface DivisionClass {
  id: number;
  name: string;
  slug: string;
  division?: Division;
  links: { self: string; division?: string };
}

export interface DivisionOrder {
  id: number;
  name: string;
  slug: string;
  division_class?: DivisionClass;
  links: { self: string; division_class?: string };
}

export interface Family {
  id: number;
  name: string;
  common_name?: string | null;
  slug: string;
  division_order?: DivisionOrder;
  links: { self: string; division_order?: string };
}

export interface Genus {
  id: number;
  name: string;
  slug: string;
  family?: Family;
  links: { self: string; family?: string };
}

export interface Plant {
  id: number;
  common_name?: string | null;
  slug: string;
  scientific_name: string;
  year?: number | null;
  bibliography?: string | null;
  author?: string | null;
  family_common_name?: string | null;
  genus_id?: number;
  main_species_id?: number | null;
  vegetable?: boolean | null;
  observations?: string | null;
  main_species?: Species;
  sources?: Source[];
  links: { self: string; genus: string; species: string };
}

export interface PlantLight {
  id: number;
  common_name?: string | null;
  slug: string;
  scientific_name: string;
  year?: number | null;
  bibliography?: string | null;
  author?: string | null;
  family_common_name?: string | null;
  genus_id?: number;
  main_species_id?: number | null;
  vegetable?: boolean | null;
  observations?: string | null;
  links: { self: string; genus: string; species: string };
}

export interface Species {
  /** An unique identifier */
  id: number;

  /** The usual common name, in english, of the species (if any). */
  common_name?: string | null;

  /** An unique human-readable identifier (if you can, prefer to use this over id) */
  slug: string;

  /** The scientific name follows the [Binomial nomenclature](https://en.wikipedia.org/wiki/Binomial_nomenclature), and represents its genus and its species within the genus, resulting in a single worldwide name for each organism. The scientific name of an infraspecific taxons (ranks below species, such as subspecies, forms, varieties...) is a combination of the name of a species and an infraspecific epithet. A connecting term is used to denote the rank. [See IAPT recommendation](https://www.iapt-taxon.org/nomen/pages/main/art_24.html) */
  scientific_name: string;

  /** The first publication year of a valid name of this species. [See author citation](https://en.wikipedia.org/wiki/Author_citation_(botany)) */
  year?: number | null;

  /** The first publication of a valid name of this species. [See author citation](https://en.wikipedia.org/wiki/Author_citation_(botany)) */
  bibliography?: string | null;

  /** The author(s) of the first publication of a valid name of this species. [See author citation](https://en.wikipedia.org/wiki/Author_citation_(botany)) */
  author?: string | null;

  /** The acceptance status of this species by IPNI */
  status?: "accepted" | "unknown";

  /** The [taxonomic rank](https://en.wikipedia.org/wiki/Taxonomic_rank) of the species */
  rank?: "species" | "ssp" | "var" | "form" | "hybrid" | "subvar";

  /** The common name (in english) of the species family */
  family_common_name?: string | null;

  /** The scientific name of the species family */
  family?: string;

  /** The id of the species genus */
  genus_id?: number;

  /** The scientific name of the species genus */
  genus?: string;

  /** A main image url of the species */
  image_url?: string | null;

  /** API endpoints to related resources */
  links?: { self: string; genus: string; plant: string };

  /**
   * The plant duration(s), which can be:
   * - Annual: plants that live, reproduce, and die in one growing season.
   * - Biennial: plants that need two growing seasons to complete their life cycle, normally completing vegetative growth the first year and flowering the second year.
   * - Perennial: plants that live for more than two years, with the shoot system dying back to soil level each year.
   *
   */
  duration?: ("annual" | "biennial" | "perennial" | null)[];

  /** The plant edible part(s), if any. */
  edible_part?: ("roots" | "stem" | "leaves" | "flowers" | "fruits" | "seeds" | "tubers" | null)[];

  /** Is the species edible? */
  edible?: boolean | null;

  /** Is the species a vegetable? */
  vegetable?: boolean | null;

  /** Some habit observations on the species */
  observations?: string | null;
  images?: {
    flower?: { id?: number; image_url?: string; copyright?: string | null }[];
    leaf?: { id?: number; image_url?: string; copyright?: string | null }[];
    habit?: { id?: number; image_url?: string; copyright?: string | null }[];
    fruit?: { id?: number; image_url?: string; copyright?: string | null }[];
    bark?: { id?: number; image_url?: string; copyright?: string | null }[];
    other?: { id?: number; image_url?: string; copyright?: string | null }[];
  };

  /** Common names of the species per language */
  common_names?: Record<string, (string | null)[]>;

  /** (Deprecated) Distribution of the species per establishment */
  distribution?: Record<string, (string | null)[]>;

  /** Distribution of the species per establishment */
  distributions?: {
    native?: {
      id?: number;
      name?: string;
      slug?: string;
      tdwg_code?: string;
      tdwg_level?: number;
      species_count?: number;
      links?: { self?: string; species?: string; plants?: string };
    }[];
    introduced?: {
      id?: number;
      name?: string;
      slug?: string;
      tdwg_code?: string;
      tdwg_level?: number;
      species_count?: number;
      links?: { self?: string; species?: string; plants?: string };
    }[];
    doubtful?: {
      id?: number;
      name?: string;
      slug?: string;
      tdwg_code?: string;
      tdwg_level?: number;
      species_count?: number;
      links?: { self?: string; species?: string; plants?: string };
    }[];
    absent?: {
      id?: number;
      name?: string;
      slug?: string;
      tdwg_code?: string;
      tdwg_level?: number;
      species_count?: number;
      links?: { self?: string; species?: string; plants?: string };
    }[];
    extinct?: {
      id?: number;
      name?: string;
      slug?: string;
      tdwg_code?: string;
      tdwg_level?: number;
      species_count?: number;
      links?: { self?: string; species?: string; plants?: string };
    }[];
  };

  /** Flower related fields (the reproductive structure found in flowering plants) */
  flower?: {
    color?: (
      | "white"
      | "red"
      | "brown"
      | "orange"
      | "yellow"
      | "lime"
      | "green"
      | "cyan"
      | "blue"
      | "purple"
      | "magenta"
      | "grey"
      | "black"
      | null
    )[];
    conspicuous?: boolean | null;
  };

  /** Foliage (or leaves) related fields */
  foliage?: {
    texture?: "fine" | "medium" | "coarse" | null;
    color?: (
      | "white"
      | "red"
      | "brown"
      | "orange"
      | "yellow"
      | "lime"
      | "green"
      | "cyan"
      | "blue"
      | "purple"
      | "magenta"
      | "grey"
      | "black"
      | null
    )[];
    leaf_retention?: boolean | null;
  };

  /** Fruit or seed related fields */
  fruit_or_seed?: {
    conspicuous?: boolean | null;
    color?: (
      | "white"
      | "red"
      | "brown"
      | "orange"
      | "yellow"
      | "lime"
      | "green"
      | "cyan"
      | "blue"
      | "purple"
      | "magenta"
      | "grey"
      | "black"
      | null
    )[];
    shape?: string | null;
    seed_persistence?: boolean | null;
  };

  /** Species's main characteristics */
  specifications?: {
    ligneous_type?: "liana" | "subshrub" | "shrub" | "tree" | "parasite" | null;
    growth_form?: string | null;
    growth_habit?: string | null;
    growth_rate?: string | null;
    average_height?: { cm?: number | null };
    maximum_height?: { cm?: number | null };
    nitrogen_fixation?: string | null;
    shape_and_orientation?: string | null;
    toxicity?: "none" | "low" | "medium" | "high" | null;
  };

  /** Growing of farming related fields */
  growth?: {
    days_to_harvest?: number | null;
    description?: string | null;
    sowing?: string | null;
    ph_maximum?: number | null;
    ph_minimum?: number | null;
    light?: number | null;
    atmospheric_humidity?: number | null;
    growth_months?: (
      | "jan"
      | "feb"
      | "mar"
      | "apr"
      | "may"
      | "jun"
      | "jul"
      | "aug"
      | "sep"
      | "oct"
      | "nov"
      | "dec"
      | null
    )[];
    bloom_months?: (
      | "jan"
      | "feb"
      | "mar"
      | "apr"
      | "may"
      | "jun"
      | "jul"
      | "aug"
      | "sep"
      | "oct"
      | "nov"
      | "dec"
      | null
    )[];
    fruit_months?: (
      | "jan"
      | "feb"
      | "mar"
      | "apr"
      | "may"
      | "jun"
      | "jul"
      | "aug"
      | "sep"
      | "oct"
      | "nov"
      | "dec"
      | null
    )[];
    row_spacing?: { cm?: number | null };
    spread?: { cm?: number | null };
    minimum_precipitation?: { mm?: number | null };
    maximum_precipitation?: { mm?: number | null };
    minimum_root_depth?: { cm?: number | null };
    minimum_temperature?: { deg_f?: number | null; deg_c?: number | null };
    maximum_temperature?: { deg_f?: number | null; deg_c?: number | null };
    soil_nutriments?: number | null;
    soil_salinity?: number | null;
    soil_texture?: number | null;
    soil_humidity?: number | null;
  };

  /** The symonyms scientific names and authors */
  synonyms?: { id?: number; name?: string; author?: string | null }[];

  /** The symonyms scientific names and authors */
  sources?: { id?: string; name?: string; citation?: string | null; url?: string | null; last_update?: string }[];
  extras?: any;
}

/**
 * The symonyms scientific names
 */
export interface SpeciesLight {
  /** An unique identifier */
  id: number;

  /** The usual common name, in english, of the species (if any). */
  common_name?: string | null;

  /** An unique human-readable identifier (if you can, prefer to use this over id) */
  slug: string;

  /** The scientific name follows the [Binomial nomenclature](https://en.wikipedia.org/wiki/Binomial_nomenclature), and represents its genus and its species within the genus, resulting in a single worldwide name for each organism. The scientific name of an infraspecific taxons (ranks below species, such as subspecies, forms, varieties...) is a combination of the name of a species and an infraspecific epithet. A connecting term is used to denote the rank. [See IAPT recommendation](https://www.iapt-taxon.org/nomen/pages/main/art_24.html) */
  scientific_name: string;

  /** The first publication year of a valid name of this species. [See author citation](https://en.wikipedia.org/wiki/Author_citation_(botany)) */
  year?: number | null;

  /** The first publication of a valid name of this species. [See author citation](https://en.wikipedia.org/wiki/Author_citation_(botany)) */
  bibliography?: string | null;

  /** The author(s) of the first publication of a valid name of this species. [See author citation](https://en.wikipedia.org/wiki/Author_citation_(botany)) */
  author?: string | null;

  /** The acceptance status of this species by IPNI */
  status: "accepted" | "unknown";

  /** The [taxonomic rank](https://en.wikipedia.org/wiki/Taxonomic_rank) of the species */
  rank: "species" | "ssp" | "var" | "form" | "hybrid" | "subvar";

  /** The common name (in english) of the species family */
  family_common_name?: string | null;

  /** The scientific name of the species family */
  family: string;

  /** The id of the species genus */
  genus_id: number;

  /** The scientific name of the species genus */
  genus: string;

  /** A main image url of the species */
  image_url?: string | null;

  /** API endpoints to related resources */
  links: { self: string; genus: string; plant: string };

  /** The symonyms scientific names */
  synonyms?: (string | null)[];
}

export interface Source {
  id?: string | null;
  name: string;
  url?: string | null;
  last_update: string;
  citation?: string | null;
}

export interface Correction {
  id: number;
  accepted_by?: string | null;
  change_notes?: string | null;
  change_status: string;
  change_type: string;
  correction?: object | null;
  created_at: string;
  notes?: string | null;
  record_id?: number | null;
  record_type: string;
  updated_at: string;
  user_id: number;
  warning_type?: string | null;
}

export interface Zone {
  id: number;
  name: string;
  slug: string;
  tdwg_code: string;
  tdwg_level: number;
  species_count: number;
  links: { self: string; plants: string; species: string };
  parent?: {
    id?: number;
    name?: string;
    slug?: string;
    tdwg_code?: string;
    tdwg_level?: number;
    species_count?: number;
    links?: { self: string; plants: string; species: string };
  };
  children?: {
    id?: number;
    name?: string;
    slug?: string;
    tdwg_code?: string;
    tdwg_level?: number;
    species_count?: number;
    links?: { self: string; plants: string; species: string };
  }[];
}

export interface RequestBodyCorrection {
  /** Some optional notes you can add. They will be visible to everybody */
  notes?: string | null;

  /** Where does this data come from ? If "external", you'll need to provide the "source_reference" field with the url or the name of the source, such as a wikipedia article, a publication, etc... */
  source_type?: "external" | "observation" | "report" | null;

  /** The url of the name of an article or a publication for theses changes */
  source_reference?: string | null;

  /** The fields to correct */
  correction?: {
    scientific_name: string;
    rank?: "species" | "ssp" | "var" | "form" | "hybrid" | "subvar" | null;
    genus?: string | null;
    year?: number | null;
    author?: string | null;
    bibliography?: string | null;
    common_name?: string | null;
    observations?: string | null;
    planting_description?: string | null;
    planting_sowing_description?: string | null;
    duration?:
      | ("annual" | "biennial" | "perennial" | null)[]
      | "annual"
      | "biennial"
      | "perennial"
      | null
      | ((("annual" | "biennial" | "perennial" | null)[] & "annual") | "biennial" | "perennial" | null);
    flower_color?:
      | (
          | "white"
          | "red"
          | "brown"
          | "orange"
          | "yellow"
          | "lime"
          | "green"
          | "cyan"
          | "blue"
          | "purple"
          | "magenta"
          | "grey"
          | "black"
          | null
        )[]
      | "white"
      | "red"
      | "brown"
      | "orange"
      | "yellow"
      | "lime"
      | "green"
      | "cyan"
      | "blue"
      | "purple"
      | "magenta"
      | "grey"
      | "black"
      | null
      | (
          | ((
              | "white"
              | "red"
              | "brown"
              | "orange"
              | "yellow"
              | "lime"
              | "green"
              | "cyan"
              | "blue"
              | "purple"
              | "magenta"
              | "grey"
              | "black"
              | null
            )[] &
              "white")
          | "red"
          | "brown"
          | "orange"
          | "yellow"
          | "lime"
          | "green"
          | "cyan"
          | "blue"
          | "purple"
          | "magenta"
          | "grey"
          | "black"
          | null
        );
    flower_conspicuous?: boolean | null;
    foliage_color?:
      | (
          | "white"
          | "red"
          | "brown"
          | "orange"
          | "yellow"
          | "lime"
          | "green"
          | "cyan"
          | "blue"
          | "purple"
          | "magenta"
          | "grey"
          | "black"
          | null
        )[]
      | "white"
      | "red"
      | "brown"
      | "orange"
      | "yellow"
      | "lime"
      | "green"
      | "cyan"
      | "blue"
      | "purple"
      | "magenta"
      | "grey"
      | "black"
      | null
      | (
          | ((
              | "white"
              | "red"
              | "brown"
              | "orange"
              | "yellow"
              | "lime"
              | "green"
              | "cyan"
              | "blue"
              | "purple"
              | "magenta"
              | "grey"
              | "black"
              | null
            )[] &
              "white")
          | "red"
          | "brown"
          | "orange"
          | "yellow"
          | "lime"
          | "green"
          | "cyan"
          | "blue"
          | "purple"
          | "magenta"
          | "grey"
          | "black"
          | null
        );
    foliage_texture?: "fine" | "medium" | "coarse" | null;
    leaf_retention?: boolean | null;
    fruit_color?:
      | (
          | "white"
          | "red"
          | "brown"
          | "orange"
          | "yellow"
          | "lime"
          | "green"
          | "cyan"
          | "blue"
          | "purple"
          | "magenta"
          | "grey"
          | "black"
          | null
        )[]
      | "white"
      | "red"
      | "brown"
      | "orange"
      | "yellow"
      | "lime"
      | "green"
      | "cyan"
      | "blue"
      | "purple"
      | "magenta"
      | "grey"
      | "black"
      | null
      | (
          | ((
              | "white"
              | "red"
              | "brown"
              | "orange"
              | "yellow"
              | "lime"
              | "green"
              | "cyan"
              | "blue"
              | "purple"
              | "magenta"
              | "grey"
              | "black"
              | null
            )[] &
              "white")
          | "red"
          | "brown"
          | "orange"
          | "yellow"
          | "lime"
          | "green"
          | "cyan"
          | "blue"
          | "purple"
          | "magenta"
          | "grey"
          | "black"
          | null
        );
    fruit_conspicuous?: boolean | null;
    fruit_seed_persistence?: boolean | null;
    fruit_months?:
      | ("jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec" | null)[]
      | "jan"
      | "feb"
      | "mar"
      | "apr"
      | "may"
      | "jun"
      | "jul"
      | "aug"
      | "sep"
      | "oct"
      | "nov"
      | "dec"
      | null
      | (
          | (("jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec" | null)[] &
              "jan")
          | "feb"
          | "mar"
          | "apr"
          | "may"
          | "jun"
          | "jul"
          | "aug"
          | "sep"
          | "oct"
          | "nov"
          | "dec"
          | null
        );
    bloom_months?:
      | ("jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec" | null)[]
      | "jan"
      | "feb"
      | "mar"
      | "apr"
      | "may"
      | "jun"
      | "jul"
      | "aug"
      | "sep"
      | "oct"
      | "nov"
      | "dec"
      | null
      | (
          | (("jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec" | null)[] &
              "jan")
          | "feb"
          | "mar"
          | "apr"
          | "may"
          | "jun"
          | "jul"
          | "aug"
          | "sep"
          | "oct"
          | "nov"
          | "dec"
          | null
        );
    ground_humidity?: number | null;
    growth_form?: string | null;
    growth_habit?: string | null;
    growth_months?:
      | ("jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec" | null)[]
      | "jan"
      | "feb"
      | "mar"
      | "apr"
      | "may"
      | "jun"
      | "jul"
      | "aug"
      | "sep"
      | "oct"
      | "nov"
      | "dec"
      | null
      | (
          | (("jan" | "feb" | "mar" | "apr" | "may" | "jun" | "jul" | "aug" | "sep" | "oct" | "nov" | "dec" | null)[] &
              "jan")
          | "feb"
          | "mar"
          | "apr"
          | "may"
          | "jun"
          | "jul"
          | "aug"
          | "sep"
          | "oct"
          | "nov"
          | "dec"
          | null
        );
    growth_rate?: string | null;
    edible_part?:
      | ("roots" | "stem" | "leaves" | "flowers" | "fruits" | "seeds" | "tubers" | null)[]
      | "roots"
      | "stem"
      | "leaves"
      | "flowers"
      | "fruits"
      | "seeds"
      | "tubers"
      | null
      | (
          | (("roots" | "stem" | "leaves" | "flowers" | "fruits" | "seeds" | "tubers" | null)[] & "roots")
          | "stem"
          | "leaves"
          | "flowers"
          | "fruits"
          | "seeds"
          | "tubers"
          | null
        );
    vegetable?: boolean | null;
    light?: number | null;
    atmospheric_humidity?: number | null;
    adapted_to_coarse_textured_soils?: string | null;
    adapted_to_fine_textured_soils?: string | null;
    adapted_to_medium_textured_soils?: string | null;
    anaerobic_tolerance?: string | null;
    average_height_unit?: "in" | "ft" | "cm" | "m" | null;
    average_height_value?: number | null;
    maximum_height_unit?: "in" | "ft" | "cm" | "m" | null;
    maximum_height_value?: number | null;
    planting_row_spacing_unit?: "in" | "ft" | "cm" | "m" | null;
    planting_row_spacing_value?: number | null;
    planting_spread_unit?: "in" | "ft" | "cm" | "m" | null;
    planting_spread_value?: number | null;
    planting_days_to_harvest?: number | null;
    maximum_precipitation_unit?: "in" | "ft" | "mm" | "cm" | "m" | null;
    maximum_precipitation_value?: number | null;
    minimum_precipitation_unit?: "in" | "ft" | "mm" | "cm" | "m" | null;
    minimum_precipitation_value?: number | null;
    minimum_root_depth_unit?: "in" | "ft" | "cm" | "m" | null;
    minimum_root_depth_value?: number | null;
    ph_maximum?: number | null;
    ph_minimum?: number | null;
    soil_nutriments?: number | null;
    soil_salinity?: number | null;
    minimum_temperature_deg_c?: number | null;
    maximum_temperature_deg_c?: number | null;
    soil_texture?: number | null;
    ligneous_type?: "liana" | "subshrub" | "shrub" | "tree" | "parasite" | null;
    toxicity?: "none" | "low" | "medium" | "high" | null;
  };
}

export interface FiltersFamilies {
  name?: string;
  slug?: string;
}

export interface FiltersGenus {
  name?: string;
  slug?: string;
  family_id?: string;
}

export interface FiltersPlants {
  author?: string;
  bloom_months?: string;
  common_name?: string;
  days_to_harvest?: string;
  duration?: string;
  establishment?: string;
  edible?: string;
  edible_part?: string;
  family_common_name?: string;
  family_name?: string;
  flower_color?: string;
  flower_conspicuous?: string;
  foliage_color?: string;
  foliage_texture?: string;
  fruit_color?: string;
  fruit_conspicuous?: string;
  fruit_months?: string;
  fruit_seed_persistence?: string;
  genus_name?: string;
  growth_form?: string;
  growth_habit?: string;
  growth_months?: string;
  growth_rate?: string;
  leaf_retention?: string;
  ligneous_type?: string;
  rank?: string;
  scientific_name?: string;
  status?: string;
  vegetable?: string;
}

export interface FiltersSpecies {
  author?: string;
  bloom_months?: string;
  common_name?: string;
  days_to_harvest?: string;
  duration?: string;
  establishment?: string;
  edible?: string;
  edible_part?: string;
  family_common_name?: string;
  family_name?: string;
  flower_color?: string;
  flower_conspicuous?: string;
  foliage_color?: string;
  foliage_texture?: string;
  fruit_color?: string;
  fruit_conspicuous?: string;
  fruit_months?: string;
  fruit_seed_persistence?: string;
  genus_name?: string;
  growth_form?: string;
  growth_habit?: string;
  growth_months?: string;
  growth_rate?: string;
  leaf_retention?: string;
  ligneous_type?: string;
  rank?: string;
  scientific_name?: string;
  status?: string;
  vegetable?: string;
}

export interface FiltersNotSpecies {
  author?: string;
  average_height_cm?: string;
  bibliography?: string;
  common_name?: string;
  days_to_harvest?: string;
  edible_part?: string;
  family_common_name?: string;
  family_name?: string;
  flower_color?: string;
  flower_conspicuous?: string;
  foliage_color?: string;
  foliage_texture?: string;
  frost_free_days_minimum?: string;
  fruit_color?: string;
  fruit_conspicuous?: string;
  fruit_seed_persistence?: string;
  genus_name?: string;
  ground_humidity?: string;
  growth_form?: string;
  growth_habit?: string;
  growth_rate?: string;
  image_url?: string;
  images_count?: string;
  leaf_retention?: string;
  light?: string;
  ligneous_type?: string;
  maximum_height_cm?: string;
  maximum_precipitation_mm?: string;
  maximum_temperature_deg_c?: string;
  maximum_temperature_deg_f?: string;
  minimum_precipitation_mm?: string;
  minimum_root_depth_cm?: string;
  minimum_temperature_deg_c?: string;
  minimum_temperature_deg_f?: string;
  ph_maximum?: string;
  ph_minimum?: string;
  planting_days_to_harvest?: string;
  planting_row_spacing_cm?: string;
  planting_spread_cm?: string;
  rank?: string;
  scientific_name?: string;
  soil_nutriments?: string;
  soil_salinity?: string;
  soil_texture?: string;
  sources_count?: string;
  status?: string;
  synonyms_count?: string;
  toxicity?: string;
  vegetable?: string;
  year?: string;
}

export interface SortsFamilies {
  name?: string;
  slug?: string;
}

export interface SortsGenus {
  name?: string;
  slug?: string;
  family_id?: string;
}

export interface SortsPlants {
  atmospheric_humidity?: string;
  author?: string;
  average_height_cm?: string;
  bibliography?: string;
  common_name?: string;
  duration?: string;
  days_to_harvest?: string;
  edible?: string;
  family_common_name?: string;
  family_name?: string;
  flower_color?: string;
  flower_conspicuous?: string;
  foliage_color?: string;
  foliage_texture?: string;
  frost_free_days_minimum?: string;
  fruit_color?: string;
  fruit_conspicuous?: string;
  fruit_seed_persistence?: string;
  ground_humidity?: string;
  growth_form?: string;
  growth_habit?: string;
  growth_rate?: string;
  images_count?: string;
  leaf_retention?: string;
  light?: string;
  ligneous_type?: string;
  maximum_height_cm?: string;
  maximum_precipitation_mm?: string;
  maximum_temperature_deg_c?: string;
  maximum_temperature_deg_f?: string;
  minimum_precipitation_mm?: string;
  minimum_root_depth_cm?: string;
  minimum_temperature_deg_c?: string;
  minimum_temperature_deg_f?: string;
  ph_maximum?: string;
  ph_minimum?: string;
  planting_days_to_harvest?: string;
  planting_row_spacing_cm?: string;
  planting_spread_cm?: string;
  rank?: string;
  scientific_name?: string;
  soil_nutriments?: string;
  soil_salinity?: string;
  soil_texture?: string;
  sources_count?: string;
  status?: string;
  synonyms_count?: string;
  toxicity?: string;
  updated_at?: string;
  vegetable?: string;
  year?: string;
}

export interface SortsSpecies {
  atmospheric_humidity?: string;
  author?: string;
  average_height_cm?: string;
  bibliography?: string;
  common_name?: string;
  duration?: string;
  days_to_harvest?: string;
  edible?: string;
  family_common_name?: string;
  family_name?: string;
  flower_color?: string;
  flower_conspicuous?: string;
  foliage_color?: string;
  foliage_texture?: string;
  frost_free_days_minimum?: string;
  fruit_color?: string;
  fruit_conspicuous?: string;
  fruit_seed_persistence?: string;
  ground_humidity?: string;
  growth_form?: string;
  growth_habit?: string;
  growth_rate?: string;
  images_count?: string;
  leaf_retention?: string;
  light?: string;
  ligneous_type?: string;
  maximum_height_cm?: string;
  maximum_precipitation_mm?: string;
  maximum_temperature_deg_c?: string;
  maximum_temperature_deg_f?: string;
  minimum_precipitation_mm?: string;
  minimum_root_depth_cm?: string;
  minimum_temperature_deg_c?: string;
  minimum_temperature_deg_f?: string;
  ph_maximum?: string;
  ph_minimum?: string;
  planting_days_to_harvest?: string;
  planting_row_spacing_cm?: string;
  planting_spread_cm?: string;
  rank?: string;
  scientific_name?: string;
  soil_nutriments?: string;
  soil_salinity?: string;
  soil_texture?: string;
  sources_count?: string;
  status?: string;
  synonyms_count?: string;
  toxicity?: string;
  updated_at?: string;
  vegetable?: string;
  year?: string;
}

export interface RangesPlants {
  atmospheric_humidity?: string;
  average_height_cm?: string;
  days_to_harvest?: string;
  frost_free_days_minimum?: string;
  ground_humidity?: string;
  images_count?: string;
  light?: string;
  maximum_height_cm?: string;
  maximum_precipitation_mm?: string;
  maximum_temperature_deg_c?: string;
  maximum_temperature_deg_f?: string;
  minimum_precipitation_mm?: string;
  minimum_root_depth_cm?: string;
  minimum_temperature_deg_c?: string;
  minimum_temperature_deg_f?: string;
  ph_maximum?: string;
  ph_minimum?: string;
  planting_days_to_harvest?: string;
  planting_row_spacing_cm?: string;
  planting_spread_cm?: string;
  soil_nutriments?: string;
  soil_salinity?: string;
  soil_texture?: string;
  sources_count?: string;
  synonyms_count?: string;
  toxicity?: string;
  year?: string;
}

export interface RangesSpecies {
  atmospheric_humidity?: string;
  average_height_cm?: string;
  days_to_harvest?: string;
  frost_free_days_minimum?: string;
  ground_humidity?: string;
  images_count?: string;
  light?: string;
  maximum_height_cm?: string;
  maximum_precipitation_mm?: string;
  maximum_temperature_deg_c?: string;
  maximum_temperature_deg_f?: string;
  minimum_precipitation_mm?: string;
  minimum_root_depth_cm?: string;
  minimum_temperature_deg_c?: string;
  minimum_temperature_deg_f?: string;
  ph_maximum?: string;
  ph_minimum?: string;
  planting_days_to_harvest?: string;
  planting_row_spacing_cm?: string;
  planting_spread_cm?: string;
  soil_nutriments?: string;
  soil_salinity?: string;
  soil_texture?: string;
  sources_count?: string;
  synonyms_count?: string;
  toxicity?: string;
  year?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: keyof Omit<Body, "body" | "bodyUsed">;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://{defaultHost}";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) => (input !== null && typeof input === "object" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      headers: {
        ...(type ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      ...requestParams,
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Trefle API v1
 * @version 1.6.0
 * @baseUrl http://{defaultHost}
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description List kingdoms
     *
     * @tags Kingdoms
     * @name ListKingdoms
     * @summary Searches kingdoms
     * @request GET:/api/v1/kingdoms
     * @secure
     */
    listKingdoms: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<
        {
          data?: Kingdom[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/kingdoms`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a kingdom
     *
     * @tags Kingdoms
     * @name GetKingdom
     * @summary Retrieve a kingdom
     * @request GET:/api/v1/kingdoms/{id}
     * @secure
     */
    getKingdom: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: Kingdom; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/kingdoms/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List subkingdoms
     *
     * @tags Subkingdoms
     * @name ListSubkingdoms
     * @summary Searches subkingdoms
     * @request GET:/api/v1/subkingdoms
     * @secure
     */
    listSubkingdoms: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<
        {
          data?: Subkingdom[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/subkingdoms`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a subkingdom
     *
     * @tags Subkingdoms
     * @name GetSubkingdom
     * @summary Retrieve a subkingdom
     * @request GET:/api/v1/subkingdoms/{id}
     * @secure
     */
    getSubkingdom: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: Subkingdom; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/subkingdoms/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List divisions
     *
     * @tags Divisions
     * @name ListDivisions
     * @summary Searches divisions
     * @request GET:/api/v1/divisions
     * @secure
     */
    listDivisions: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<
        {
          data?: Division[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/divisions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a division
     *
     * @tags Divisions
     * @name GetDivision
     * @summary Retrieve a division
     * @request GET:/api/v1/divisions/{id}
     * @secure
     */
    getDivision: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: Division; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/divisions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List division classes
     *
     * @tags DivisionClasses
     * @name ListDivisionClasses
     * @summary Searches division classes
     * @request GET:/api/v1/division_classes
     * @secure
     */
    listDivisionClasses: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<
        {
          data?: DivisionClass[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/division_classes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a division class
     *
     * @tags DivisionClasses
     * @name GetDivisionClass
     * @summary Retrieve a division class
     * @request GET:/api/v1/division_classes/{id}
     * @secure
     */
    getDivisionClass: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: DivisionClass; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/division_classes/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List division orders
     *
     * @tags DivisionOrders
     * @name ListDivisionOrders
     * @summary Searches division orders
     * @request GET:/api/v1/division_orders
     * @secure
     */
    listDivisionOrders: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<
        {
          data?: DivisionOrder[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/division_orders`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a division order
     *
     * @tags DivisionOrders
     * @name GetDivisionOrder
     * @summary Retrieve a division order
     * @request GET:/api/v1/division_orders/{id}
     * @secure
     */
    getDivisionOrder: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: DivisionOrder; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/division_orders/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List families
     *
     * @tags Families
     * @name ListFamilies
     * @summary Searches families
     * @request GET:/api/v1/families
     * @secure
     */
    listFamilies: (
      query?: { page?: number; filter?: FiltersFamilies; order?: SortsFamilies },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: Family[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/families`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a family
     *
     * @tags Families
     * @name GetFamily
     * @summary Retrieve a family
     * @request GET:/api/v1/families/{id}
     * @secure
     */
    getFamily: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: Family; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/families/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List genus
     *
     * @tags Genus
     * @name ListGenus
     * @summary Searches genus
     * @request GET:/api/v1/genus
     * @secure
     */
    listGenus: (query?: { filter?: FiltersGenus; order?: SortsGenus; page?: number }, params: RequestParams = {}) =>
      this.request<
        {
          data?: Genus[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/genus`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a genus
     *
     * @tags Genus
     * @name GetGenus
     * @summary Retrieve a genus
     * @request GET:/api/v1/genus/{id}
     * @secure
     */
    getGenus: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: Genus; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/genus/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List plants
     *
     * @tags Plants
     * @name ListPlants
     * @summary List plants
     * @request GET:/api/v1/plants
     * @secure
     */
    listPlants: (
      query?: {
        filter?: FiltersSpecies;
        filter_not?: FiltersNotSpecies;
        order?: SortsSpecies;
        range?: RangesSpecies;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: SpeciesLight[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/plants`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a plant
     *
     * @tags Plants
     * @name GetPlant
     * @summary Retrieve a plant
     * @request GET:/api/v1/plants/{id}
     * @secure
     */
    getPlant: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: Plant; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/plants/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Search for a plant with the given scientific name, common name, synonym name etc.
     *
     * @tags Plants
     * @name SearchPlants
     * @summary Search for a plant
     * @request GET:/api/v1/plants/search
     * @secure
     */
    searchPlants: (
      query: {
        q: string;
        page?: number;
        filter?: FiltersPlants;
        filter_not?: FiltersNotSpecies;
        order?: SortsPlants;
        range?: RangesPlants;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: SpeciesLight[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        any
      >({
        path: `/api/v1/plants/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description A short API call to report an error regarding a plant entry
     *
     * @tags Plants
     * @name ReportPlants
     * @summary Report an error
     * @request POST:/api/v1/plants/{id}/report
     * @secure
     */
    reportPlants: (id: string, data: { notes?: string }, params: RequestParams = {}) =>
      this.request<{ data?: Correction; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/plants/${id}/report`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List all the plants in the requested zone.
     *
     * @tags Plants
     * @name ListPlantsZone
     * @summary List plants in a distribution zone
     * @request GET:/api/v1/distributions/{zone_id}/plants
     * @secure
     */
    listPlantsZone: (
      zone_id: string,
      query?: {
        filter?: FiltersSpecies;
        filter_not?: FiltersNotSpecies;
        order?: SortsSpecies;
        range?: RangesSpecies;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: SpeciesLight[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/distributions/${zone_id}/plants`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List plants of the requested genus
     *
     * @tags Plants
     * @name ListPlantsGenus
     * @summary List plants of a genus
     * @request GET:/api/v1/genus/{genus_id}/plants
     * @secure
     */
    listPlantsGenus: (
      genus_id: string,
      query?: {
        filter?: FiltersSpecies;
        filter_not?: FiltersNotSpecies;
        order?: SortsSpecies;
        range?: RangesSpecies;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: SpeciesLight[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/genus/${genus_id}/plants`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List species
     *
     * @tags Species
     * @name ListSpecies
     * @summary List species
     * @request GET:/api/v1/species
     * @secure
     */
    listSpecies: (
      query?: {
        filter?: FiltersSpecies;
        filter_not?: FiltersNotSpecies;
        order?: SortsSpecies;
        range?: RangesSpecies;
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: SpeciesLight[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/species`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a species
     *
     * @tags Species
     * @name GetSpecies
     * @summary Retrieve a species
     * @request GET:/api/v1/species/{id}
     * @secure
     */
    getSpecies: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          data?: Species;
          meta?: { last_modified?: string; images_count?: number; sources_count?: number; synonyms_count?: number };
        },
        void
      >({
        path: `/api/v1/species/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Search for a species with the given scientific name, common name, synonym name etc.
     *
     * @tags Species
     * @name SearchSpecies
     * @summary Search for a species
     * @request GET:/api/v1/species/search
     * @secure
     */
    searchSpecies: (
      query: {
        q: string;
        page?: number;
        filter?: FiltersSpecies;
        filter_not?: FiltersNotSpecies;
        order?: SortsSpecies;
        range?: RangesSpecies;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          data?: SpeciesLight[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        any
      >({
        path: `/api/v1/species/search`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description A short API call to report an error regarding a species entry
     *
     * @tags Species
     * @name ReportSpecies
     * @summary Report an error
     * @request POST:/api/v1/species/{id}/report
     * @secure
     */
    reportSpecies: (id: string, data: { notes?: string }, params: RequestParams = {}) =>
      this.request<{ data?: Correction; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/species/${id}/report`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List distributions zones. Zones are following the WGSRPD convention. WGSRPD provides an agreed system of geographical units at approximately "country" level and upwards for use in recording plant distributions. It allows adopting organizations to compare and exchange data with each other without loss of information due to incompatible geographical boundaries. [Read more on the TDWG website](https://www.tdwg.org/standards/wgsrpd/).
     *
     * @tags Distributions
     * @name ListDistributions
     * @summary List distributions zones
     * @request GET:/api/v1/distributions
     * @secure
     */
    listDistributions: (query?: { page?: number }, params: RequestParams = {}) =>
      this.request<
        {
          data?: Zone[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/distributions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a zone
     *
     * @tags Distributions
     * @name GetZone
     * @summary Retrieve a distribution zone
     * @request GET:/api/v1/distributions/{id}
     * @secure
     */
    getZone: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: Zone; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/distributions/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description If you need to perform client-side requests, you will have to request a client-side token from you backend, and get a JWT token from this API call in return. This token will be usable on the client side. This call need your secret access token, the url of the website the client side requests will come from and optionally the client IP address.
     *
     * @tags Auth
     * @name ClaimClientSideToken
     * @summary Request a client-side token
     * @request POST:/api/auth/claim
     * @secure
     */
    claimClientSideToken: (data: { origin: string; ip?: string | null }, params: RequestParams = {}) =>
      this.request<{ expiration?: string; token?: string }, void>({
        path: `/api/auth/claim`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description List corrections
     *
     * @tags Corrections
     * @name ListCorrections
     * @summary Searches corrections
     * @request GET:/api/v1/corrections
     * @secure
     */
    listCorrections: (params: RequestParams = {}) =>
      this.request<
        {
          data?: Correction[];
          links?: { self: string; first?: string; next?: string; prev?: string; last?: string };
          meta?: { total?: number };
        },
        void
      >({
        path: `/api/v1/corrections`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get a correction
     *
     * @tags Corrections
     * @name GetCorrection
     * @summary Retrieve a correction
     * @request GET:/api/v1/corrections/{id}
     * @secure
     */
    getCorrection: (id: string, params: RequestParams = {}) =>
      this.request<{ data?: Correction; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/corrections/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Submit a new correction for the given species, that will be reviewed and merged into the database. See [Complete our data](/docs/advanced/complete-data) to get started.
     *
     * @tags Corrections
     * @name CreateCorrection
     * @summary Submit a correction
     * @request POST:/api/v1/corrections/species/{record_id}
     * @secure
     */
    createCorrection: (record_id: string, data: RequestBodyCorrection, params: RequestParams = {}) =>
      this.request<{ data?: Correction; meta?: { last_modified?: string } }, void>({
        path: `/api/v1/corrections/species/${record_id}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
