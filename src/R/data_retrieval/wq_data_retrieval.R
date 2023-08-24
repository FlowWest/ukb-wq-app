# This script sets up the API to call 
# WQ data for the Klamath Tribes via the 
# dataRetrieval package

library(tidyverse)
library(dataRetrieval)
library(httr)
library(readr)

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
           result_sample_fraction_text,
           result_measure_value,
           result_measure_measure_unit_code,
           result_status_identifier,
           result_analytical_method_method_name,
           provider_name) |> distinct()
}

get_wqp_data <- function(start_date, end_date, organization, parameter = NULL) {
  
  # Set the URL for the API endpoint
  url <- "https://www.waterqualitydata.us/data/Result/search?"
  
  # Set the parameters for the query
  params <- list(
    statecode = "US:41",
    organization = organization,
    startDateLo = start_date,
    startDateHi = end_date,
    dataProfile = "narrowResult",
    characteristicName = parameter,
    providers = "STORET" # we know that klamath tribes only has Storet data - TODO trouble shoot having this item as a list 
  )
  
  # Make the API request
  response <- GET(url, query = params)
  
  # Check if the request was successful (status code 200)
  if (status_code(response) == 200) {
    # check to see if there's data: 
    if(nchar(content(response, "text")) > 2104) {
    
    # Read the CSV data
    data <- read_csv(content(response, "text")) |> 
        col_select()

  } else {
    # Print an error message if the request was not successful
    print("Error: Request failed to get results data")
  }
  
  # read in site data:  -----------------------------------------------------
  # Set the URL for the API endpoint
  url <- "https://www.waterqualitydata.us/data/Station/search?"
  
  # Set the parameters for the query
  params <- list(
    statecode = "US:41",
    organization = organization,
    startDateLo = start_date,
    startDateHi = end_date,
    providers = "STORET"
  )
  
  # Make the API request
  response <- GET(url, query = params)
  
  # Check if the request was successful (status code 200)
  if (status_code(response) == 200) {
    # Read the CSV data
    sites <- read_csv(content(response, "text")) |> 
      janitor::clean_names() |> 
      select(organization_identifier, monitoring_location_identifier, monitoring_location_name, monitoring_location_type_name,
             huc_eight_digit_code, latitude_measure, longitude_measure) 
  } else {
    # Print an error message if the request was not successful
    print("Error: Request failed to get Site data.")
  }
  
  # merge site and results data ---------------------------------------------
  
  all_data <- data |> 
    left_join(sites)
  
  return(all_data)
  } else {
    return(print("ERROR: no data in request. Check dates and other input parameters. "))
  }
  
}


# run query!  -------------------------------------------------------------

## fill out params: 
start_date <- "01-01-2000"
end_date <- "02-02-2000"
organization <- "KLAMATHTRIBES_WQX"
parameter <- "Ammonia-nitrogen"

start_time <- Sys.time()

all_data <- get_wqp_data(start_date, end_date, organization, parameter)

end_time <- Sys.time()
total_time <- end_time - start_time
print(total_time)


