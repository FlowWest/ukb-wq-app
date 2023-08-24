library(tidyverse)
library(dataRetrieval)

# get static data from WQP: 

col_select <- function(data) {
  data |> 
    janitor::clean_names() |> 
    select(organization_identifier,
           organization_formal_name,
           activity_start_date,
           activity_start_time_time,
           activity_start_time_time_zone_code,
           monitoring_location_identifier,
           characteristic_name,
           subject_taxonomic_name, 
           result_sample_fraction_text,
           result_measure_value,
           result_measure_measure_unit_code,
           result_status_identifier,
           result_analytical_method_method_name,
           provider_name) |> 
    distinct()
}


### downloaded directly from WQP:
all_results <- read_csv('data-raw/narrowresult 3.csv') |>  col_select()

stns <- read_csv('data-raw/station 2.csv') |> 
  janitor::clean_names() |> 
  select(organization_identifier, monitoring_location_identifier, monitoring_location_name, monitoring_location_type_name,
         huc_eight_digit_code, latitude_measure, longitude_measure) 

all_data <- all_results |> 
  left_join(stns)

params <- unique(all_data$characteristic_name)
print(params)

sites <- unique(all_data$monitoring_location_identifier)
print(sites)

min_date <- min(all_data$activity_start_date)
print(min_date)

max_date <- max(all_data$activity_start_date)
print(max_date)

all_data_update <- all_data |> 
  mutate(characteristic_name = case_when(characteristic_name == "Phosphate-phosphorus***retired***use Total Phosphorus, mixed forms" ~ "Total Phosphorus, mixed forms",
                                         characteristic_name == "Inorganic nitrogen (nitrate and nitrite) ***retired***use Nitrate + Nitrite" ~ "Nitrate + Nitrite",
                                         characteristic_name == "Temperature, water" ~ "Water Temperature",
                                         characteristic_name == "Count" ~ "Zooplankton Count", 
                                         characteristic_name == "Height, gage" ~ "Gage Height", 
                                         .default = characteristic_name)) |> 
  # TODO: check with Klamath Tribes to see about removing zoo and phytoplankton dataset
  filter(!(characteristic_name %in% c('Zooplankton Count', "Total Sample Weight", "Phytoplankton Density", "Biomass", "Abundance"))) |> 
  # TODO: also remove: "Pheophytin a", "Light, photosynthetic active radiation (PAR)"??
  select(-result_sample_fraction_text)

params <- unique(all_data_update$characteristic_name)
print(params)

write_csv(all_data_update, "data/all_klamath_data_on_wqp_v08242023.csv")

# truncated version
all_data_update |> 
  slice(1:100) |> 
write_csv("data/truncated_klamath_data_v08242023.csv")

# stations
stns <- all_data_update |> 
  group_by(monitoring_location_identifier, huc_eight_digit_code, latitude_measure, longitude_measure) |> 
  summarise(params = paste0(unique(characteristic_name), collapse = ", "), 
            min_date = min(activity_start_date),
            max_date = max(activity_start_date)) |> 
  write_csv("data/monitoring_station_locations_v08242023.csv")
