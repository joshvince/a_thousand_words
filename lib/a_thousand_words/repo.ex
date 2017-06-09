defmodule AThousandWords.Repo do
  @moduledoc """
  An API for interacting with the database.

  Currently, this is mostly convenience functions that follow the API
  of the `ExAws.Dynamo` module. See the individual functions for basic details,
  and consult the `ExAws.Dynamo` docs for full details.
  """
  alias ExAws.Dynamo, as: Dynamo

  @doc """
  Put item in the table. `record` should be a map, obviously...
  """
  def put_item(table_name, record, opts \\ []) do
    Dynamo.put_item(table_name, record, opts)
    |> ExAws.request()
  end

  @doc """
  Update an item in the table.
  """
  def update_item(table_name, primary_key, update_opts) do
    Dynamo.update_item(table_name, primary_key, update_opts)
    |> ExAws.request()
  end

  @doc """
  Get one item from the table based on the primary key.

  Primary key should be a map with strings for keys.
  """
  def get_item(table_name, primary_key, opts \\ []) do
    Dynamo.get_item(table_name, primary_key, opts)
    |> ExAws.request()
  end

  @doc """
  Scans a table for items that match the given options.

  ```
  Dynamo.scan("Users"
    limit: 1,
    expression_attribute_values: [desired_api_key: "adminkey"],
    expression_attribute_names: %{"#asdf" => "api_key"},
    filter_expression: "#asdf = :desired_api_key")
  ```
  """
  def scan(table_name, opts \\ []) do
    Dynamo.scan(table_name, opts)
    |> ExAws.request()
  end

  @doc """
  Query a table based on the given primary key.

  ```
  AThousandWords.Repo.query("Pictures",
    expression_attribute_values: [val1: "London"],
    key_condition_expression: "place = :val1")
  ```
  """
  def query(table_name, opts \\ []) do
    Dynamo.query(table_name, opts)
    |> ExAws.request()
  end

  @doc """
  Delete a record in the table.

  Primary key should be a map with strings for keys.
  """
  def delete_item(table_name, primary_key, opts \\ []) do
    Dynamo.delete_item(table_name, primary_key, opts)
    |> ExAws.request()
  end

  def test_get_tables() do
    ExAws.Dynamo.list_tables()
    |> ExAws.request()
  end
end
