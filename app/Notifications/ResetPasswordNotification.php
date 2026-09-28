<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(
        public string $token
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = config('app.frontend_url') . '/reset-password?token='
            . $this->token
            . '&email='
            . urlencode($notifiable->email);

        return (new MailMessage)
        ->subject('Reset Your TinyLink Password')
        ->greeting('Hello ' . $notifiable->name . '!')
        ->line('We received a request to reset the password for your TinyLink account.')
        ->action('Reset My Password', $url)
        ->line('This link will expire after a limited time.')
        ->line('If you did not request a password reset, you can safely ignore this email.')
        ->salutation('Regards, TinyLink Team');
    }
}