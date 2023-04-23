<?php

namespace App\Notifications;

use App\Http\Resources\ContentListResource;
use App\Models\Content;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ContentNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public ContentListResource $content;

    public function __construct(Content $content)
    {
        $this->content = new ContentListResource($content);
    }

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("{$this->content->title}")
            ->markdown('emails.content', ['content' => $this->content->toArray(request())]);
    }

    public function toArray($notifiable): array
    {
        return [];
    }
}
