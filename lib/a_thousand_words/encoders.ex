
# Encode Tupes as Lists, to avoid any nastiness when converting ecto structs to json before sending to the client.

defimpl Poison.Encoder, for: Tuple do
  def encode(tuple, options) do
    tuple
    |> Tuple.to_list
    |> Poison.encode!
  end
end