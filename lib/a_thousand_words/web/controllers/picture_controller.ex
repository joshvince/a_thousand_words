defmodule AThousandWords.Web.PictureController do
  use AThousandWords.Web, :controller

  alias AThousandWords.Artifacts
  alias AThousandWords.Artifacts.Picture

  action_fallback AThousandWords.Web.FallbackController

  def index(conn, _params) do
    pictures = Artifacts.list_pictures()
    render(conn, "index.json", pictures: pictures)
  end

  def create(conn, %{"picture" => picture_params}) do
    with {:ok, %Picture{} = picture} <- Artifacts.create_picture(picture_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", picture_path(conn, :show, picture))
      |> render("show.json", picture: picture)
    end
  end

  def show(conn, %{"id" => id}) do
    picture = Artifacts.get_picture!(id)
    render(conn, "show.json", picture: picture)
  end

  def update(conn, %{"id" => id, "picture" => picture_params}) do
    picture = Artifacts.get_picture!(id)

    with {:ok, %Picture{} = picture} <- Artifacts.update_picture(picture, picture_params) do
      render(conn, "show.json", picture: picture)
    end
  end

  def delete(conn, %{"id" => id}) do
    picture = Artifacts.get_picture!(id)
    with {:ok, %Picture{}} <- Artifacts.delete_picture(picture) do
      send_resp(conn, :no_content, "")
    end
  end
end
