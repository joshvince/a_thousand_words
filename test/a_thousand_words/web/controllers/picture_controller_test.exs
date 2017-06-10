defmodule AThousandWords.Web.PictureControllerTest do
  use AThousandWords.Web.ConnCase

  alias AThousandWords.Artifacts
  alias AThousandWords.Artifacts.Picture

  @geoJSON_point %{"coordinates" => [-0.15157699584960938, 51.434106241971826], "type" => "Point"}
  @create_attrs %{year: 1960, name: "My Childhood Home", description: "Where I grew up", location: @geoJSON_point}
  @update_attrs %{year: 1961, location: @geoJSON_point}
  @invalid_attrs %{year: 1999, description: 0001010101010101001}

  def fixture(:picture) do
    {:ok, picture} = Artifacts.create_picture(@create_attrs)
    picture
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, picture_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates picture and renders picture when data is valid", %{conn: conn} do
    conn = post conn, picture_path(conn, :create), picture: @create_attrs
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn = get conn, picture_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id}
  end

  test "does not create picture and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, picture_path(conn, :create), picture: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates chosen picture and renders picture when data is valid", %{conn: conn} do
    %Picture{id: id} = picture = fixture(:picture)
    conn = put conn, picture_path(conn, :update, picture), picture: @update_attrs
    assert %{"id" => ^id} = json_response(conn, 200)["data"]

    conn = get conn, picture_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id}
  end

  test "does not update chosen picture and renders errors when data is invalid", %{conn: conn} do
    picture = fixture(:picture)
    conn = put conn, picture_path(conn, :update, picture), picture: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen picture", %{conn: conn} do
    picture = fixture(:picture)
    conn = delete conn, picture_path(conn, :delete, picture)
    assert response(conn, 204)
    assert_error_sent 404, fn ->
      get conn, picture_path(conn, :show, picture)
    end
  end
end
