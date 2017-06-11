defmodule AThousandWords.Web.Artifacts.PictureChannelTest do
  use AThousandWords.Web.ChannelCase
  alias AThousandWords.Web.Artifacts.PictureChannel
  alias AThousandWords.Artifacts
  alias AThousandWords.Repo

  @picture_params %{ "description" => "My grandad's house",
                    "location" => %{"coordinates" => [-0.33210039138793945, 50.882148345079656],
                                    "type" => "Point"}, 
                    "name" => "Penlands Vale", "year" => 1999}

  setup do
    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(PictureChannel, "artifacts:picture")
    {:ok, socket: socket, params: @picture_params}
  end

  test "ping replies with status ok", %{socket: socket} do
    ref = push socket, "ping", %{"hello" => "there"}
    assert_reply ref, :ok, %{"hello" => "there"}
  end

  test "list_pictures sends a reply containing all the pictures", %{socket: socket} do
    expected_payload = %{pictures: Artifacts.list_pictures()}
    ref = push socket, "list_pictures", %{}
    assert_reply ref, :ok, ^expected_payload
  end

  test "create_picture creates a picture in the db using the payload", %{socket: socket, params: params} do
    ref = push socket, "create_picture", %{"params" => params}
    assert_reply ref, :ok, returned_payload
    assert is_map(returned_payload.picture)
    assert Repo.all(Artifacts.Picture) != []
  end

  test "update_picture updates a picture in the db using the payload", %{socket: socket, params: params} do
    {:ok, %Artifacts.Picture{id: id}} = Artifacts.create_picture(params)
    update_params = %{"year" => 2000}
    ref = push socket, "update_picture", %{"id" => id, "params" => update_params}
    assert_reply ref, :ok
    assert Repo.get_by(Artifacts.Picture, id: id, year: 2000)
  end

  test "get_picture returns the picture with the given id if there was one", %{socket: socket, params: params} do
    {:ok, %Artifacts.Picture{id: id} = picture} = Artifacts.create_picture(params)
    ref = push socket, "get_picture", %{"id" => id}
    expected_reply = %{picture: picture}
    assert_reply ref, :ok, ^expected_reply
  end

  test "delete_picture deletes the picture with the given id from the db", %{socket: socket, params: params} do
    {:ok, %Artifacts.Picture{id: id} = picture} = Artifacts.create_picture(params)
    ref = push socket, "delete_picture", %{"id" => id}
    assert_reply ref, :ok
    refute Repo.get(Artifacts.Picture, id)
  end

end
