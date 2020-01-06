library(dplyr)
library(ggplot2)

dat <- read.csv('data/final.csv')

max.views <- dat %>%
  group_by(playlist) %>%
  summarise(max = sum(views))

playlist.lookup <- max.views$max
names(playlist.lookup) <- max.views$playlist

dat %>%
  ggplot() +
  aes(idx, views / playlist.lookup[playlist], group = playlist) +
  geom_line() +
  theme_minimal() +
  labs(x = "Episode #", y = "Proportion of total views")

ggsave('plot.png', width = 9, height = 5)
