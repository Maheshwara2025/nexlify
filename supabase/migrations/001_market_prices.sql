-- market_prices: singleton row for gold / silver / diesel rates
create table if not exists market_prices (
  id int primary key default 1 check (id = 1),
  gold_price text not null default '0',
  silver_price text not null default '0',
  diesel_price text not null default '0',
  updated_at timestamptz not null default now()
);

alter table market_prices enable row level security;

create policy "market_prices public read"
  on market_prices for select
  using (true);

create policy "market_prices auth write"
  on market_prices for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into market_prices (id, gold_price, silver_price, diesel_price)
values (1, '72500', '85000', '92.50')
on conflict (id) do nothing;
