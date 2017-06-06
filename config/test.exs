use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :a_thousand_words, AThousandWords.Web.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :a_thousand_words, AThousandWords.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "a_thousand_words_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
