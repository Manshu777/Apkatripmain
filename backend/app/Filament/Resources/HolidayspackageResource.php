<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HolidayspackageResource\Pages;
use App\Models\Holidayspackage;
use Closure;
use Filament\Forms;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class HolidayspackageResource extends Resource
{
    protected static ?string $model = Holidayspackage::class;

    protected static ?string $navigationIcon = 'fontisto-holiday-village';

    protected static ?string $navigationLabel = 'Holidays Packages';
    // protected static ?string $navigationIcon = 'heroicon-o-home-modern';
    protected static ?string $navigationGroup = 'Holidays Packages';


    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->required()
                    ->label('Package Name'),
                TextInput::make('location')
                    ->required()
                    ->label('Location'),
                TextInput::make('duration')
                    ->required()
                    ->label('Duration'),
                Repeater::make('traveloptions')
                    ->label('Travel Options')
                    ->schema([
                        Select::make('type')
                            ->label('Travel Type')
                            ->options([
                                'flight' => 'Flight',
                                'without_flight' => 'Without Flight',
                                'bus' => 'By Bus',
                            ])
                            ->required()
                            ->reactive(),
                        TextInput::make('price')
                            ->label('Price')
                            ->numeric()
                            ->required(),
                        TextInput::make('from')
                            ->label('Flight From')
                            ->required()
                            ->visible(fn(Forms\Get $get) => $get('type') === 'flight'),
                        TextInput::make('to')
                            ->label('Flight To')
                            ->required()
                            ->visible(fn(Forms\Get $get) => $get('type') === 'flight'),
                        TextInput::make('travel_to')
                            ->label('Travel To (User Location)')
                            ->required()
                            ->visible(fn(Forms\Get $get) => $get('type') === 'without_flight'),
                        TextInput::make('bus_from')
                            ->label('Bus From')
                            ->required()
                            ->visible(fn(Forms\Get $get) => $get('type') === 'bus'),
                        TextInput::make('bus_to')
                            ->label('Bus To')
                            ->required()
                            ->visible(fn(Forms\Get $get) => $get('type') === 'bus'),
                    ])
                    ->columns(2)
                    ->collapsed(),

                RichEditor::make('highlights')
                    ->label('Highlights')
                    ->placeholder('Enter highlights separated by commas')
                    ->helperText('Example: Private Pool Villa, Couple Spa Session'),

                RichEditor::make('inclusions')
                    ->label('Inclusions')
                    ->placeholder('Enter inclusions separated by commas'),

                RichEditor::make('exclusions')
                    ->label('Exclusions')
                    ->placeholder('Enter exclusions separated by commas'),

                RichEditor::make('cancellationPolicy')
                    ->label('Cancellation Policy')
                    ->placeholder('Enter Cancellation Policy separated by commas'),

                RichEditor::make('additionalInfo')
                    ->label('Additional Info')
                    ->placeholder('Enter Additional Info separated by commas'),

                Card::make([
                    TextInput::make('rating')
                        ->label('Rating')
                        ->numeric()
                        ->step(0.1)
                        ->placeholder('Enter rating out of 5'),

                    Repeater::make('reviews')
                        ->label('Reviews')
                        ->schema([
                            TextInput::make('user')->label('User Name'),
                            TextInput::make('rating')->label('Rating')->numeric(),
                            Textarea::make('comment')->label('Comment'),
                            TextInput::make('date')->label('Date')->type('date'),
                            FileUpload::make('image')
                                ->label('Review Image')
                                ->image()
                                ->required(false)
                                ->maxSize(1.5 * 1024)
                                ->helperText('Allowed file types: JPG, PNG, GIF')
                        ])
                        ->columns(2)
                        ->collapsed(),
                ])
                    ->label('Package Rating & Reviews'),


                FileUpload::make('images')
                    ->label('Package Image')
                    ->image()
                    ->required(false)
                    ->maxSize(1.5 * 1024)
                    ->multiple()
                    ->helperText('Allowed file types: JPG, PNG, GIF'),

                Repeater::make('itinerary')
                    ->label('Itinerary')
                    ->schema([
                        TextInput::make('day')->label('Day')->numeric(),
                        DatePicker::make('date')
                            ->label('Date')
                            ->required()
                            ->displayFormat('Y-m-d')
                            ->firstDayOfWeek(1),
                        Card::make([

                            RichEditor::make('description')->label('Description'),
                            RichEditor::make('activities')
                                ->label('Activities')
                                ->schema([
                                    TextInput::make('activity')->label('Activity'),
                                ])
                                ->columns(1),
                            FileUpload::make('image')
                                ->label('Review Image')
                                ->image()
                                ->required(false)
                                ->maxSize(1.5 * 1024)
                                ->multiple()
                                ->helperText('Allowed file types: JPG, PNG, GIF')
                        ]),
                    ])
                    ->columns(2)
                    ->collapsed(),


            ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->label('Package Name')->searchable(),
                TextColumn::make('location')->label('Location'),
                TextColumn::make('duration')->label('Duration'),
                TextColumn::make('price.withFlight')->label('Price with Flight')->sortable(),
                TextColumn::make('price.withoutFlight')->label('Price without Flight')->sortable(),
                TextColumn::make('rating')->label('Rating')->sortable(),
            ])
            ->filters([])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListHolidayspackages::route('/'),
            'create' => Pages\CreateHolidayspackage::route('/create'),
            'view' => Pages\ViewHolidayspackage::route('/{record}'),
            'edit' => Pages\EditHolidayspackage::route('/{record}/edit'),
        ];
    }
}
