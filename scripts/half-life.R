library(dplyr)

dat <- read.csv('data/final.csv')

find.half <- function(pl, most.viewed) {
  best.row <- dat %>%
    filter(playlist == pl) %>%
    mutate(distance = abs((most.viewed / 2) - views)) %>%
    arrange(distance, idx) %>%
    head(1)
  
  return(best.row$idx)
}

half.lifes <- dat %>%
  group_by(playlist) %>%
  summarise(closest = find.half(playlist, max(views)))

(half.lifes %>% summarise(hl = median(closest)))$hl
