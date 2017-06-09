use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :a_thousand_words, AThousandWords.Web.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
# Configure ex_aws to call the the development database
config :ex_aws, :dynamodb,
  scheme: "http://",
  host: "localhost",
  port: 8000,
  region: "eu-west-1",
  debug_requests: true
